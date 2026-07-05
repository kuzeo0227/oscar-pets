// Oscar Pets Lab — Content Hub server.
// Binds to 127.0.0.1 only. All state lives in data/content.json via lib/store.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./lib/store');
const { buildSeed } = require('./lib/seed');

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

// ---- Routes (step 1: data read + idea patch; full API lands in step 2) ----

app.get('/api/data', async (req, res, next) => {
  try {
    res.json(await store.read());
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
      return idea;
    }, actorOf(req));
    if (!updated) return res.status(404).json({ error: 'idea not found' });
    res.json(updated);
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
