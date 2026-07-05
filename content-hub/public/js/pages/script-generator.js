/* Script Generator — agent-driven. "Generate" creates a task for Claude;
   the page polls /api/scripts every 5s until the script appears, then
   renders the brief with export / archive / regenerate actions. */
(() => {
  const { api, toast, escapeHtml, mondayOf, ymd, $, $$ } = window.Hub;

  const POLL_MS = 5000;

  // Module-level so polling survives navigation away and back.
  let pending = null; // { topic, ideaId, since, timer }
  let currentScriptId = null; // which script the page is showing

  const norm = (s) => String(s || '').trim().toLowerCase();

  function stopPolling() {
    if (pending?.timer) clearInterval(pending.timer);
    pending = null;
  }

  async function createGenerationTask(topic, ideaId) {
    const description = `Generate script: ${topic}${ideaId ? ` (ideaId: ${ideaId})` : ''}`;
    await api('/tasks', { method: 'POST', body: { description } });
    pending = { topic, ideaId: ideaId || null, since: new Date().toISOString(), timer: null };
  }

  function startPolling(content) {
    if (!pending) return;
    clearInterval(pending.timer);
    pending.timer = setInterval(async () => {
      try {
        const scripts = await api('/scripts');
        const found = scripts.find(
          (s) => s.createdAt >= pending.since && norm(s.topic).includes(norm(pending.topic)),
        );
        if (found) {
          stopPolling();
          currentScriptId = found.id;
          toast('Script ready');
          if (document.contains(content)) render(content);
          window.Hub.refreshShell();
        }
      } catch { /* server briefly unavailable — keep polling */ }
    }, POLL_MS);
  }

  // ---------- brief rendering ----------

  function notesBlock(script, section) {
    const filming = script.filmingNotes.filter((n) => n.section === section);
    const editing = script.editingNotes.filter((n) => n.section === section);
    if (!filming.length && !editing.length) return '';
    const list = (label, notes) => (notes.length ? `
      <div class="note-block">
        <span class="note-label mono">${label}</span>
        <ul class="note-list">${notes.map((n) => `<li>${escapeHtml(n.note)}</li>`).join('')}</ul>
      </div>` : '');
    return `<div class="note-blocks">${list('Filming', filming)}${list('Editing', editing)}</div>`;
  }

  function briefSection(label, text, notesHtml) {
    return `
      <section class="brief-section">
        <span class="eyebrow">${label}</span>
        <p class="brief-text">${escapeHtml(text)}</p>
        ${notesHtml}
      </section>`;
  }

  function briefCard(script) {
    return `
    <div class="card brief" data-id="${script.id}">
      <div class="brief-header">
        <div>
          <span class="eyebrow">Script brief</span>
          <h2 class="brief-topic">${escapeHtml(script.topic)}</h2>
        </div>
        <div class="brief-meta mono">
          ${script.archived ? '<span class="chip">archived</span>' : ''}
          <span class="brief-date">${escapeHtml(script.createdAt.slice(0, 10))}</span>
        </div>
      </div>
      ${briefSection('Hook', script.hook, notesBlock(script, 'hook'))}
      ${briefSection('Insight', script.insight, notesBlock(script, 'insight'))}
      ${briefSection('CTA', script.cta, notesBlock(script, 'cta'))}
      <section class="brief-section">
        <span class="eyebrow">Caption</span>
        <p class="brief-text">${escapeHtml(script.caption)}</p>
      </section>
      <section class="brief-section">
        <span class="eyebrow">Hashtags</span>
        <div class="hashtag-row">${script.hashtags.map((h) => `<span class="chip">${escapeHtml(h)}</span>`).join('')}</div>
      </section>
      <div class="brief-actions">
        <button class="btn btn-primary" id="export-docx">Export .docx</button>
        <button class="btn btn-secondary" id="archive-script" ${script.archived ? 'disabled' : ''}>
          ${script.archived ? 'Archived' : 'Save to Archive'}
        </button>
        <button class="btn btn-ghost" id="regenerate">Regenerate</button>
      </div>
    </div>`;
  }

  async function downloadDocx(scriptId) {
    const res = await fetch(`/api/scripts/${scriptId}/export`, { method: 'POST' });
    if (!res.ok) throw new Error('Export failed');
    const filename = res.headers.get('X-Export-Filename') || 'script.docx';
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return filename;
  }

  // ---------- page ----------

  async function render(content) {
    const [scripts, ideas] = await Promise.all([api('/scripts'), api('/ideas')]);

    // Approved ideas for the current and next week feed the dropdown.
    const thisMonday = ymd(mondayOf(new Date()));
    const nextMondayDate = mondayOf(new Date());
    nextMondayDate.setDate(nextMondayDate.getDate() + 7);
    const nextMonday = ymd(nextMondayDate);
    const approvedIdeas = ideas.filter(
      (i) => i.status === 'approved' && (i.weekStart === thisMonday || i.weekStart === nextMonday),
    );

    // Script on display: explicit selection, else newest.
    const byNewest = [...scripts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const script = byNewest.find((s) => s.id === currentScriptId) || byNewest[0] || null;
    if (script) currentScriptId = script.id;

    content.innerHTML = `
      <div class="page-header">
        <div class="tabs">
          <a class="tab" href="#/weekly-plan">Weekly Plan</a>
          <a class="tab active" href="#/script-generator">Script Generator</a>
        </div>
      </div>

      <div class="card generator-input">
        <label class="field-label mono" for="topic-input">Enter a topic or pick an approved idea</label>
        <div class="generator-row">
          <input class="input" id="topic-input" placeholder="e.g. Why probiotics matter in tropical climates">
          <select class="input" id="idea-select">
            <option value="">— approved ideas (this + next week) —</option>
            ${approvedIdeas.map((i) => `<option value="${i.id}">${escapeHtml(i.title)}</option>`).join('')}
          </select>
          <button class="btn btn-primary" id="generate-btn">Generate</button>
        </div>
      </div>

      ${pending ? `
        <div class="card generating-card">
          <span class="dot dot-pulse"></span>
          <div>
            <div class="generating-title">Claude is writing &ldquo;${escapeHtml(pending.topic)}&rdquo;</div>
            <div class="generating-sub mono">Task queued &middot; polling /api/scripts every 5s</div>
          </div>
          <button class="btn btn-ghost btn-sm" id="cancel-poll">Dismiss</button>
        </div>` : ''}

      ${script ? briefCard(script) : `
        <div class="card empty-state">
          <span class="eyebrow">No scripts yet</span>
          <p>Generate one from a topic or an approved idea above.</p>
        </div>`}
    `;

    if (pending) startPolling(content);

    // Selecting an idea fills the topic field.
    $('#idea-select').addEventListener('change', () => {
      const idea = approvedIdeas.find((i) => i.id === $('#idea-select').value);
      if (idea) $('#topic-input').value = idea.title;
    });

    $('#generate-btn').addEventListener('click', async () => {
      const topic = $('#topic-input').value.trim();
      if (!topic) { toast('Enter a topic or pick an idea'); return; }
      if (pending) { toast('A generation task is already pending'); return; }
      try {
        await createGenerationTask(topic, $('#idea-select').value || null);
        toast('Task assigned to Claude');
        await render(content);
        window.Hub.refreshShell();
      } catch (err) {
        toast(err.message);
      }
    });

    const cancelBtn = $('#cancel-poll');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        stopPolling();
        render(content);
      });
    }

    if (!script) return;

    $('#export-docx').addEventListener('click', async () => {
      try {
        const filename = await downloadDocx(script.id);
        toast(`Exported ${filename}`);
      } catch (err) {
        toast(err.message);
      }
    });

    $('#archive-script').addEventListener('click', async () => {
      try {
        await api(`/scripts/${script.id}`, { method: 'PATCH', body: { archived: true } });
        toast('Saved to archive');
        render(content);
      } catch (err) {
        toast(err.message);
      }
    });

    // Regenerate: new task, appends a new script — never overwrites.
    $('#regenerate').addEventListener('click', async () => {
      if (pending) { toast('A generation task is already pending'); return; }
      try {
        await createGenerationTask(script.topic, script.ideaId);
        toast('Regeneration task assigned to Claude');
        await render(content);
        window.Hub.refreshShell();
      } catch (err) {
        toast(err.message);
      }
    });
  }

  window.Pages['/script-generator'] = render;
})();
