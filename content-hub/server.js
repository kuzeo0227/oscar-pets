// Oscar Pets Lab — Content Hub server.
// Binds to 127.0.0.1 only. All state lives in data/content.json via lib/store.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuid } = require('uuid');
const store = require('./lib/store');
const { buildSeed, mondayOf } = require('./lib/seed');
const { exportScript } = require('./lib/exportDocx');

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Actor attribution: agents send X-Agent: claude; the UI sends nothing.
function actorOf(req) {
  return req.get('X-Agent') === 'claude' ? 'claude' : 'ui';
}

function detectPlatform(url) {
  const u = String(url).toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('xiaohongshu') || u.includes('xhslink')) return 'rednote';
  if (u.includes('facebook.com') || u.includes('fb.com') || u.includes('fb.watch')) return 'facebook';
  if (u.includes('shopee')) return 'shopee';
  return 'other';
}

const asArray = (body) => (Array.isArray(body) ? body : [body]);

// ---------------------------------------------------------------- full data

app.get('/api/data', async (req, res, next) => {
  try {
    res.json(await store.read());
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------------------------- ideas

app.get('/api/ideas', async (req, res, next) => {
  try {
    const data = await store.read();
    const ideas = req.query.week
      ? data.ideas.filter((i) => i.weekStart === req.query.week)
      : data.ideas;
    res.json(ideas);
  } catch (err) {
    next(err);
  }
});

// Accepts a single idea object or an array. Missing fields get sane defaults;
// anything still invalid is rejected by schema validation with a 400.
app.post('/api/ideas', async (req, res, next) => {
  try {
    const actor = actorOf(req);
    const created = await store.update((data) => {
      const items = asArray(req.body).map((input) => {
        const suggestedDate = input.suggestedDate || new Date().toISOString().slice(0, 10);
        const idea = {
          id: uuid(),
          weekStart: input.weekStart || mondayOf(suggestedDate + 'T00:00:00'),
          platform: input.platform,
          goal: input.goal,
          title: input.title || '',
          angle: input.angle || '',
          format: input.format || '',
          suggestedDate,
          hookReference: input.hookReference || '',
          sourceLinks: (input.sourceLinks || []).map((l) => ({
            url: l.url || '',
            platform: l.platform || detectPlatform(l.url || ''),
            note: l.note || '',
          })),
          status: input.status || 'pending',
          createdBy: input.createdBy || (actor === 'claude' ? 'ai' : 'manual'),
          createdAt: new Date().toISOString(),
        };
        data.ideas.push(idea); // append, never replace
        return idea;
      });
      return items;
    }, actor);
    res.status(201).json(Array.isArray(req.body) ? created : created[0]);
  } catch (err) {
    next(err);
  }
});

const IDEA_PATCHABLE = [
  'weekStart', 'platform', 'goal', 'title', 'angle', 'format',
  'suggestedDate', 'hookReference', 'sourceLinks', 'status',
];

app.patch('/api/ideas/:id', async (req, res, next) => {
  try {
    const updated = await store.update((data) => {
      const idea = data.ideas.find((i) => i.id === req.params.id);
      if (!idea) return null;
      for (const key of IDEA_PATCHABLE) {
        if (key in req.body) idea[key] = req.body[key];
      }
      // Approving an idea puts it on the schedule (once). There is no POST
      // /api/schedule — this is the only way schedule rows are created for ideas.
      if (idea.status === 'approved' && !data.schedule.some((s) => s.refType === 'idea' && s.refId === idea.id)) {
        data.schedule.push({
          id: uuid(),
          refType: 'idea',
          refId: idea.id,
          platform: idea.platform,
          suggestedDate: idea.suggestedDate,
          actualPostedDate: null,
        });
      }
      return idea;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'idea not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------------------------- inbox

app.get('/api/inbox', async (req, res, next) => {
  try {
    res.json((await store.read()).inbox);
  } catch (err) {
    next(err);
  }
});

// Accepts one entry, an array of entries, or plain URL strings.
app.post('/api/inbox', async (req, res, next) => {
  try {
    const created = await store.update((data) => {
      const items = asArray(req.body).map((input) => {
        const obj = typeof input === 'string' ? { url: input } : input;
        const entry = {
          id: uuid(),
          url: obj.url || '',
          platform: obj.platform || detectPlatform(obj.url || ''),
          note: obj.note || '',
          status: 'unprocessed',
          addedAt: new Date().toISOString(),
        };
        data.inbox.push(entry);
        return entry;
      });
      return items;
    }, actorOf(req));
    res.status(201).json(Array.isArray(req.body) ? created : created[0]);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/inbox/:id', async (req, res, next) => {
  try {
    const updated = await store.update((data) => {
      const entry = data.inbox.find((e) => e.id === req.params.id);
      if (!entry) return null;
      for (const key of ['status', 'note', 'platform']) {
        if (key in req.body) entry[key] = req.body[key];
      }
      return entry;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'inbox entry not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ------------------------------------------------------------------ scripts

app.get('/api/scripts', async (req, res, next) => {
  try {
    res.json((await store.read()).scripts);
  } catch (err) {
    next(err);
  }
});

app.post('/api/scripts', async (req, res, next) => {
  try {
    const input = req.body;
    const created = await store.update((data) => {
      const script = {
        id: uuid(),
        ideaId: input.ideaId ?? null,
        topic: input.topic || '',
        hook: input.hook || '',
        insight: input.insight || '',
        cta: input.cta || '',
        filmingNotes: input.filmingNotes || [],
        editingNotes: input.editingNotes || [],
        caption: input.caption || '',
        hashtags: input.hashtags || [],
        archived: input.archived ?? false,
        createdAt: new Date().toISOString(),
      };
      data.scripts.push(script); // append, never overwrite
      return script;
    }, actorOf(req));
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

const SCRIPT_PATCHABLE = [
  'ideaId', 'topic', 'hook', 'insight', 'cta',
  'filmingNotes', 'editingNotes', 'caption', 'hashtags', 'archived',
];

app.patch('/api/scripts/:id', async (req, res, next) => {
  try {
    const updated = await store.update((data) => {
      const script = data.scripts.find((s) => s.id === req.params.id);
      if (!script) return null;
      for (const key of SCRIPT_PATCHABLE) {
        if (key in req.body) script[key] = req.body[key];
      }
      return script;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'script not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Generates the .docx, saves it to exports/scripts/, and streams it back
// as a download in the same request.
app.post('/api/scripts/:id/export', async (req, res, next) => {
  try {
    const data = await store.read();
    const script = data.scripts.find((s) => s.id === req.params.id);
    if (!script) return res.status(404).json({ error: 'script not found' });

    const { filename, buffer } = await exportScript(script);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'X-Export-Filename': filename,
    });
    res.send(buffer);
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------- schedule

app.get('/api/schedule', async (req, res, next) => {
  try {
    res.json((await store.read()).schedule);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/schedule/:id', async (req, res, next) => {
  try {
    const updated = await store.update((data) => {
      const entry = data.schedule.find((e) => e.id === req.params.id);
      if (!entry) return null;
      for (const key of ['actualPostedDate', 'suggestedDate', 'platform']) {
        if (key in req.body) entry[key] = req.body[key];
      }
      return entry;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'schedule entry not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------------------------- tasks

app.get('/api/tasks', async (req, res, next) => {
  try {
    res.json((await store.read()).tasks);
  } catch (err) {
    next(err);
  }
});

app.post('/api/tasks', async (req, res, next) => {
  try {
    const created = await store.update((data) => {
      const task = {
        id: uuid(),
        assignedTo: 'claude',
        description: req.body.description || '',
        status: req.body.status || 'pending',
        createdAt: new Date().toISOString(),
      };
      data.tasks.push(task);
      return task;
    }, actorOf(req));
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/tasks/:id', async (req, res, next) => {
  try {
    const updated = await store.update((data) => {
      const task = data.tasks.find((t) => t.id === req.params.id);
      if (!task) return null;
      for (const key of ['status', 'description']) {
        if (key in req.body) task[key] = req.body[key];
      }
      return task;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'task not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ------------------------------------------------------------------- ai-log

app.get('/api/ai-log', async (req, res, next) => {
  try {
    res.json((await store.read()).aiLog);
  } catch (err) {
    next(err);
  }
});

app.post('/api/ai-log', async (req, res, next) => {
  try {
    const actor = actorOf(req);
    const created = await store.update((data) => {
      const entry = {
        id: uuid(),
        agent: req.body.agent || actor,
        action: req.body.action || '',
        timestamp: new Date().toISOString(),
      };
      data.aiLog.push(entry);
      return entry;
    }, actor);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// ---- Error handling ----

app.use((err, req, res, next) => {
  if (err instanceof store.ValidationError) {
    return res.status(400).json({ error: 'validation failed', reasons: err.errors });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'request body is not valid JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'internal error' });
});

// ---- Startup ----

store
  .init(buildSeed)
  .then(({ seeded }) => {
    app.listen(PORT, HOST, () => {
      console.log(`Content Hub running at http://${HOST}:${PORT}`);
      console.log(seeded ? 'Seeded data/content.json with sample data.' : 'Loaded existing data/content.json (valid).');
    });
  })
  .catch((err) => {
    console.error('Startup failed — data/content.json invalid or unreadable:');
    console.error(err.message);
    process.exit(1);
  });
