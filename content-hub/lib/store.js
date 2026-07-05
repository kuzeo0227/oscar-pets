// Atomic file store for data/content.json.
//
// Rules (per build spec):
// - Read-modify-write on EVERY request; never cache JSON in memory between requests.
// - Atomic writes: write to content.json.tmp, then rename over the original.
// - Before each write, copy the current file to content.json.bak (rolling, single backup).
// - Validate on startup and on every write; reject invalid payloads, never write partial data.
// - Cap aiLog at 500 entries — prune oldest on write.

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { validate } = require('./schema');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');
const TMP_FILE = DATA_FILE + '.tmp';
const BAK_FILE = DATA_FILE + '.bak';
const AI_LOG_CAP = 500;

// Serialize mutations within this process so concurrent requests can't
// interleave their read-modify-write cycles.
let writeChain = Promise.resolve();

class ValidationError extends Error {
  constructor(errors) {
    super('Schema validation failed: ' + errors.join('; '));
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

async function read() {
  const raw = await fsp.readFile(DATA_FILE, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`data/content.json is not valid JSON: ${err.message}`);
  }
  const result = validate(data);
  if (!result.ok) throw new ValidationError(result.errors);
  return data;
}

async function writeAtomic(data) {
  const json = JSON.stringify(data, null, 2) + '\n';
  // Rolling single backup of the current good file.
  if (fs.existsSync(DATA_FILE)) {
    await fsp.copyFile(DATA_FILE, BAK_FILE);
  }
  await fsp.writeFile(TMP_FILE, json, 'utf8');
  await fsp.rename(TMP_FILE, DATA_FILE);
}

// update(mutator, actor): reads fresh from disk, applies mutator(data),
// validates the result, stamps meta, prunes aiLog, writes atomically.
// mutator may return a value; update() resolves with it.
function update(mutator, actor = 'ui') {
  const job = writeChain.then(async () => {
    const data = await read();
    const returned = await mutator(data);

    if (data.aiLog.length > AI_LOG_CAP) {
      // Oldest entries are at the front (log is append-only).
      data.aiLog = data.aiLog.slice(data.aiLog.length - AI_LOG_CAP);
    }
    data.meta.lastModifiedBy = actor === 'claude' ? 'claude' : 'ui';
    data.meta.lastModifiedAt = new Date().toISOString();

    const result = validate(data);
    if (!result.ok) throw new ValidationError(result.errors);

    await writeAtomic(data);
    return returned;
  });
  // Keep the chain alive even if this job rejects.
  writeChain = job.catch(() => {});
  return job;
}

// Startup: ensure data dir exists, seed if missing, validate existing file.
async function init(seedFactory) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const seed = seedFactory();
    const result = validate(seed);
    if (!result.ok) throw new ValidationError(result.errors);
    await writeAtomic(seed);
    return { seeded: true };
  }
  await read(); // throws if corrupt/invalid
  return { seeded: false };
}

module.exports = { read, update, init, ValidationError, DATA_FILE, BAK_FILE };
