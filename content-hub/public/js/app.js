/* Oscar Pets Lab — Content Hub shell.
   Hash router + top bar state + sidebar badges + Assign AI Task modal.
   Page modules register themselves on window.Pages (added in later steps). */

const API = '/api';

// ---------------- utilities ----------------

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    let detail = '';
    try {
      const err = await res.json();
      detail = err.reasons ? err.reasons.join('; ') : err.error;
    } catch { /* non-JSON error body */ }
    throw new Error(detail || `Request failed (${res.status})`);
  }
  return res.json();
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 2600);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// Monday of the week containing `d`, as a Date.
function mondayOf(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  date.setDate(date.getDate() + (day === 0 ? -6 : 1 - day));
  return date;
}

function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmtShort(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

// "Week of Jul 6 – Jul 12" for a Monday date.
function weekLabel(monday) {
  const end = new Date(monday);
  end.setDate(end.getDate() + 6);
  return `Week of ${fmtShort(monday)} – ${fmtShort(end)}`;
}

// ---------------- router ----------------

const ROUTES = {
  '/weekly-plan': { title: 'Weekly Plan', step: 4 },
  '/script-generator': { title: 'Script Generator', step: 5 },
  '/schedule': { title: 'Schedule', step: 7 },
  '/link-inbox': { title: 'Link Inbox', step: 6 },
  '/idea-sources': { title: 'Idea Sources', step: 8 },
  '/ai-activity': { title: 'AI Activity', step: 8 },
  '/past-scripts': { title: 'Past Scripts', step: 8 },
};

// Later build steps register real renderers here, keyed by route.
window.Pages = window.Pages || {};

function currentRoute() {
  const hash = location.hash.replace(/^#/, '') || '/weekly-plan';
  return ROUTES[hash] ? hash : '/weekly-plan';
}

async function render() {
  const route = currentRoute();
  const meta = ROUTES[route];

  $$('.nav-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.route === route);
  });

  document.title = `${meta.title} — Oscar Pets Lab Content Hub`;

  const content = $('#content');
  const page = window.Pages[route];
  if (page) {
    await page(content);
  } else {
    content.innerHTML = `
      <div class="page-header"><h1 class="page-title">${meta.title}</h1></div>
      <div class="card empty-state">
        <span class="eyebrow">Under construction</span>
        <p>${meta.title} is built in step ${meta.step} of the build order.</p>
      </div>`;
  }
  refreshShell();
}

// ---------------- shell state (badges, agent status) ----------------

async function refreshShell() {
  try {
    const data = await api('/data');

    const monday = mondayOf(new Date());
    $('#topbar-week').textContent = weekLabel(monday);
    $('#badge-week').textContent = `${fmtShort(monday)}`.toUpperCase();

    const unprocessed = data.inbox.filter((e) => e.status === 'unprocessed').length;
    const inboxBadge = $('#badge-inbox');
    inboxBadge.textContent = unprocessed;
    inboxBadge.hidden = unprocessed === 0;

    const pending = data.tasks.filter((t) => t.status !== 'done').length;
    const taskBadge = $('#badge-tasks');
    taskBadge.textContent = pending;
    taskBadge.hidden = pending === 0;

    const working = data.tasks.some((t) => t.status === 'in_progress');
    const dot = $('#claude-dot');
    dot.classList.toggle('dot-muted', !working);
    dot.classList.toggle('dot-pulse', working);
    $('#claude-state').textContent = working ? 'WORKING' : 'IDLE';
  } catch (err) {
    console.error('Shell refresh failed:', err);
  }
}

// ---------------- Assign AI Task modal ----------------

function openModal(id) {
  $(`#${id}`).hidden = false;
  const focusable = $(`#${id} textarea, #${id} input, #${id} select`);
  if (focusable) focusable.focus();
}

function closeModal(overlay) {
  overlay.hidden = true;
}

function wireModals() {
  $$('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
    $$('[data-close-modal]', overlay).forEach((btn) => {
      btn.addEventListener('click', () => closeModal(overlay));
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $$('.modal-overlay:not([hidden])').forEach(closeModal);
  });
}

function wireAssignTask() {
  $('#assign-task-btn').addEventListener('click', () => {
    $('#task-description').value = '';
    openModal('assign-task-modal');
  });

  $('#assign-task-submit').addEventListener('click', async () => {
    const description = $('#task-description').value.trim();
    if (!description) { toast('Task description is required'); return; }
    try {
      await api('/tasks', { method: 'POST', body: { description } });
      closeModal($('#assign-task-modal'));
      toast('Task assigned to Claude');
      refreshShell();
      if (currentRoute() === '/ai-activity') render();
    } catch (err) {
      toast(err.message);
    }
  });
}

// ---------------- boot ----------------

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  wireModals();
  wireAssignTask();
  render();
});

// Shared helpers for page modules (later steps).
window.Hub = { api, toast, escapeHtml, mondayOf, ymd, fmtShort, weekLabel, refreshShell, openModal, closeModal, $, $$ };
