// Schema validation for data/content.json.
// validate(data) returns { ok: true } or { ok: false, errors: [...] }.
// Writes that fail validation must be rejected before touching disk.

const PLATFORMS = ['tiktok', 'shopee', 'instagram', 'facebook', 'rednote', 'other'];
const GOALS = ['reach', 'trust', 'convert'];
const IDEA_STATUSES = ['pending', 'approved', 'rejected'];
const INBOX_STATUSES = ['unprocessed', 'processed'];
const TASK_STATUSES = ['pending', 'in_progress', 'done'];
const REF_TYPES = ['idea', 'script'];
const NOTE_SECTIONS = ['hook', 'insight', 'cta'];
const CREATED_BY = ['ai', 'manual'];
const AGENTS = ['claude', 'ui'];

const isStr = (v) => typeof v === 'string';
const isNonEmptyStr = (v) => isStr(v) && v.length > 0;
const isDateStr = (v) => isStr(v) && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isIsoStr = (v) => isStr(v) && !Number.isNaN(Date.parse(v));

function checkArrayOfObjects(data, key, errors) {
  if (!Array.isArray(data[key])) {
    errors.push(`"${key}" must be an array`);
    return false;
  }
  data[key].forEach((item, i) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      errors.push(`${key}[${i}] must be an object`);
    }
  });
  return errors.length === 0;
}

function validate(data) {
  const errors = [];

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { ok: false, errors: ['root must be an object'] };
  }

  // meta
  if (typeof data.meta !== 'object' || data.meta === null) {
    errors.push('"meta" must be an object');
  } else {
    if (data.meta.schemaVersion !== 1) errors.push('meta.schemaVersion must be 1');
    if (!AGENTS.includes(data.meta.lastModifiedBy)) {
      errors.push('meta.lastModifiedBy must be "claude" or "ui"');
    }
    if (!isIsoStr(data.meta.lastModifiedAt)) {
      errors.push('meta.lastModifiedAt must be an ISO-8601 string');
    }
  }

  for (const key of ['ideas', 'inbox', 'scripts', 'schedule', 'tasks', 'aiLog']) {
    checkArrayOfObjects(data, key, errors);
  }
  if (errors.length > 0) return { ok: false, errors };

  data.ideas.forEach((idea, i) => {
    const at = `ideas[${i}]`;
    if (!isNonEmptyStr(idea.id)) errors.push(`${at}.id required`);
    if (!isDateStr(idea.weekStart)) errors.push(`${at}.weekStart must be YYYY-MM-DD`);
    if (!PLATFORMS.includes(idea.platform)) errors.push(`${at}.platform must be one of ${PLATFORMS.join('|')}`);
    if (!GOALS.includes(idea.goal)) errors.push(`${at}.goal must be one of ${GOALS.join('|')}`);
    if (!isStr(idea.title)) errors.push(`${at}.title must be a string`);
    if (!isStr(idea.angle)) errors.push(`${at}.angle must be a string`);
    if (!isStr(idea.format)) errors.push(`${at}.format must be a string`);
    if (!isDateStr(idea.suggestedDate)) errors.push(`${at}.suggestedDate must be YYYY-MM-DD`);
    if (!isStr(idea.hookReference)) errors.push(`${at}.hookReference must be a string`);
    if (!Array.isArray(idea.sourceLinks)) {
      errors.push(`${at}.sourceLinks must be an array`);
    } else {
      idea.sourceLinks.forEach((link, j) => {
        if (typeof link !== 'object' || link === null) {
          errors.push(`${at}.sourceLinks[${j}] must be an object`);
        } else {
          if (!isStr(link.url)) errors.push(`${at}.sourceLinks[${j}].url must be a string`);
          if (!isStr(link.platform)) errors.push(`${at}.sourceLinks[${j}].platform must be a string`);
          if (!isStr(link.note)) errors.push(`${at}.sourceLinks[${j}].note must be a string`);
        }
      });
    }
    if (!IDEA_STATUSES.includes(idea.status)) errors.push(`${at}.status must be one of ${IDEA_STATUSES.join('|')}`);
    if (!CREATED_BY.includes(idea.createdBy)) errors.push(`${at}.createdBy must be "ai" or "manual"`);
    if (!isIsoStr(idea.createdAt)) errors.push(`${at}.createdAt must be ISO-8601`);
  });

  data.inbox.forEach((entry, i) => {
    const at = `inbox[${i}]`;
    if (!isNonEmptyStr(entry.id)) errors.push(`${at}.id required`);
    if (!isNonEmptyStr(entry.url)) errors.push(`${at}.url required`);
    if (!isStr(entry.platform)) errors.push(`${at}.platform must be a string`);
    if (!isStr(entry.note)) errors.push(`${at}.note must be a string`);
    if (!INBOX_STATUSES.includes(entry.status)) errors.push(`${at}.status must be one of ${INBOX_STATUSES.join('|')}`);
    if (!isIsoStr(entry.addedAt)) errors.push(`${at}.addedAt must be ISO-8601`);
  });

  data.scripts.forEach((script, i) => {
    const at = `scripts[${i}]`;
    if (!isNonEmptyStr(script.id)) errors.push(`${at}.id required`);
    if (script.ideaId !== null && !isStr(script.ideaId)) errors.push(`${at}.ideaId must be a string or null`);
    if (!isStr(script.topic)) errors.push(`${at}.topic must be a string`);
    if (!isStr(script.hook)) errors.push(`${at}.hook must be a string`);
    if (!isStr(script.insight)) errors.push(`${at}.insight must be a string`);
    if (!isStr(script.cta)) errors.push(`${at}.cta must be a string`);
    for (const noteKey of ['filmingNotes', 'editingNotes']) {
      if (!Array.isArray(script[noteKey])) {
        errors.push(`${at}.${noteKey} must be an array`);
      } else {
        script[noteKey].forEach((n, j) => {
          if (typeof n !== 'object' || n === null || !NOTE_SECTIONS.includes(n.section) || !isStr(n.note)) {
            errors.push(`${at}.${noteKey}[${j}] must be { section: hook|insight|cta, note: string }`);
          }
        });
      }
    }
    if (!isStr(script.caption)) errors.push(`${at}.caption must be a string`);
    if (!Array.isArray(script.hashtags) || !script.hashtags.every(isStr)) {
      errors.push(`${at}.hashtags must be an array of strings`);
    }
    if (typeof script.archived !== 'boolean') errors.push(`${at}.archived must be a boolean`);
    if (!isIsoStr(script.createdAt)) errors.push(`${at}.createdAt must be ISO-8601`);
  });

  data.schedule.forEach((entry, i) => {
    const at = `schedule[${i}]`;
    if (!isNonEmptyStr(entry.id)) errors.push(`${at}.id required`);
    if (!REF_TYPES.includes(entry.refType)) errors.push(`${at}.refType must be "idea" or "script"`);
    if (!isNonEmptyStr(entry.refId)) errors.push(`${at}.refId required`);
    if (!isStr(entry.platform)) errors.push(`${at}.platform must be a string`);
    if (!isDateStr(entry.suggestedDate)) errors.push(`${at}.suggestedDate must be YYYY-MM-DD`);
    if (entry.actualPostedDate !== null && !isDateStr(entry.actualPostedDate)) {
      errors.push(`${at}.actualPostedDate must be YYYY-MM-DD or null`);
    }
  });

  data.tasks.forEach((task, i) => {
    const at = `tasks[${i}]`;
    if (!isNonEmptyStr(task.id)) errors.push(`${at}.id required`);
    if (task.assignedTo !== 'claude') errors.push(`${at}.assignedTo must be "claude"`);
    if (!isNonEmptyStr(task.description)) errors.push(`${at}.description required`);
    if (!TASK_STATUSES.includes(task.status)) errors.push(`${at}.status must be one of ${TASK_STATUSES.join('|')}`);
    if (!isIsoStr(task.createdAt)) errors.push(`${at}.createdAt must be ISO-8601`);
  });

  data.aiLog.forEach((entry, i) => {
    const at = `aiLog[${i}]`;
    if (!isNonEmptyStr(entry.id)) errors.push(`${at}.id required`);
    if (!AGENTS.includes(entry.agent)) errors.push(`${at}.agent must be "claude" or "ui"`);
    if (!isNonEmptyStr(entry.action)) errors.push(`${at}.action required`);
    if (!isIsoStr(entry.timestamp)) errors.push(`${at}.timestamp must be ISO-8601`);
  });

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

module.exports = {
  validate,
  PLATFORMS,
  GOALS,
  IDEA_STATUSES,
  INBOX_STATUSES,
  TASK_STATUSES,
  REF_TYPES,
  NOTE_SECTIONS,
};
