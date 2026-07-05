# Oscar Pets Lab — Content Hub

Local dashboard for content ideas, scripts, scheduling, and AI task tracking.
Node.js + Express, plain HTML/CSS/JS (no React), all data in `data/content.json`.

## Run

```
cd content-hub
npm install
npm start        # → http://127.0.0.1:3000
```

First launch seeds `data/content.json` with sample data. The server binds to
`127.0.0.1` only.

## Architecture

- **No AI/LLM API calls.** Idea generation and script research are agent-driven:
  Claude Code researches and writes results into `data/content.json` via the API
  (send header `X-Agent: claude`) or direct file edits. The dashboard is a
  display + approval + tracking layer.
- ChatGPT desktop gets READ-ONLY access to `data/content.json`.
- Every request is read-modify-write against the file (never cached in memory),
  so external edits show up immediately. Writes are atomic (`.tmp` + rename)
  with a rolling single backup at `data/content.json.bak`, schema-validated
  before touching disk. `aiLog` is capped at 500 entries.
- If `content.json` is ever corrupted, the server refuses to start — restore
  with `cp data/content.json.bak data/content.json`.

## API

```
GET    /api/data                     full JSON
GET    /api/ideas?week=YYYY-MM-DD    POST /api/ideas (object or array)
PATCH  /api/ideas/:id                approving auto-creates a schedule row
GET    /api/inbox                    POST /api/inbox (objects, strings, or array)
PATCH  /api/inbox/:id
GET    /api/scripts                  POST /api/scripts    PATCH /api/scripts/:id
POST   /api/scripts/:id/export      .docx → exports/scripts/ + browser download
GET    /api/schedule                 PATCH /api/schedule/:id
GET    /api/tasks    POST /api/tasks    PATCH /api/tasks/:id
GET    /api/ai-log   POST /api/ai-log
```

## Agent research workflow

1. Check Link Inbox (`GET /api/inbox`) for unprocessed URLs → fetch public
   content, extract hook patterns.
2. Pull TikTok Creative Center trending data for pet/supplement-adjacent
   trends in SEA.
3. `POST /api/ideas` (with `X-Agent: claude`) — 3–4 ideas with `sourceLinks`
   and `hookReference` filled, status `pending`. Always append, never replace.
4. `PATCH /api/inbox/:id` to mark entries processed; `POST /api/ai-log` a
   summary entry.
