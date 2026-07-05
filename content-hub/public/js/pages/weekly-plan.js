/* Weekly Plan — idea review board for a Monday-start week. */
(() => {
  const { api, toast, escapeHtml, mondayOf, ymd, fmtShort, weekLabel, refreshShell, $, $$ } = window.Hub;

  // Week currently in view (Date, always a Monday). Survives route changes.
  let viewMonday = mondayOf(new Date());

  const GOALS = ['reach', 'trust', 'convert'];
  const PLATFORMS = ['tiktok', 'shopee', 'instagram', 'facebook', 'rednote'];

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function sourceLinkChips(links) {
    if (!links || !links.length) return '';
    const chips = links.map((l) => `
      <a class="chip chip-link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener"
         title="${escapeHtml(l.note || l.url)}">${escapeHtml(l.platform || 'link')}<span class="chip-ext">&#8599;</span></a>`);
    return `<div class="idea-links">${chips.join('')}</div>`;
  }

  function ideaCard(idea) {
    const date = new Date(idea.suggestedDate + 'T00:00:00');
    return `
    <article class="card idea-card ${idea.status}" data-id="${idea.id}">
      <div class="idea-chips">
        <span class="chip">${escapeHtml(idea.platform)}</span>
        <span class="chip chip-inverted">${cap(idea.goal)}</span>
        ${idea.status !== 'pending' ? `<span class="chip idea-status-chip">${idea.status}</span>` : ''}
      </div>
      <h3 class="idea-title">${escapeHtml(idea.title)}</h3>
      <p class="idea-angle">${escapeHtml(idea.angle)}</p>
      <div class="idea-meta mono">${escapeHtml(idea.format)} &nbsp;&middot;&nbsp; ${fmtShort(date)}</div>
      ${idea.hookReference ? `<p class="idea-hook">${escapeHtml(idea.hookReference)}</p>` : ''}
      ${sourceLinkChips(idea.sourceLinks)}
      <div class="idea-actions">
        <button class="btn btn-primary btn-sm" data-action="approved" ${idea.status === 'approved' ? 'disabled' : ''}>Approve</button>
        <button class="btn btn-ghost btn-sm" data-action="rejected" ${idea.status === 'rejected' ? 'disabled' : ''}>Reject</button>
      </div>
    </article>`;
  }

  function addIdeaModal() {
    const dateDefault = ymd(viewMonday);
    return `
    <div class="modal-overlay" id="add-idea-modal">
      <div class="modal modal-lg" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 class="modal-title">Add Idea</h2>
          <button class="modal-close" data-close-modal aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <div class="field">
              <label class="field-label mono" for="idea-platform">Platform</label>
              <select class="input" id="idea-platform">
                ${PLATFORMS.map((p) => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label class="field-label mono" for="idea-goal">Goal</label>
              <select class="input" id="idea-goal">
                ${GOALS.map((g) => `<option value="${g}">${cap(g)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="field">
            <label class="field-label mono" for="idea-title">Title</label>
            <input class="input" id="idea-title" placeholder="e.g. 3 signs your dog needs a probiotic">
          </div>
          <div class="field">
            <label class="field-label mono" for="idea-angle">Angle</label>
            <input class="input" id="idea-angle" placeholder="One-line description of the take">
          </div>
          <div class="form-grid">
            <div class="field">
              <label class="field-label mono" for="idea-format">Format</label>
              <input class="input" id="idea-format" placeholder="e.g. 15s vertical video, carousel">
            </div>
            <div class="field">
              <label class="field-label mono" for="idea-date">Suggested date</label>
              <input class="input" id="idea-date" type="date" value="${dateDefault}">
            </div>
          </div>
          <div class="field">
            <label class="field-label mono" for="idea-hook">Hook reference</label>
            <input class="input" id="idea-hook" placeholder="The retention hook pattern this idea is based on">
          </div>
          <div class="field">
            <label class="field-label mono" for="idea-links">Source links <span class="optional">(optional, one URL per line)</span></label>
            <textarea class="input textarea" id="idea-links" rows="3" placeholder="https://www.tiktok.com/@.../video/..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-close-modal>Cancel</button>
          <button class="btn btn-primary" id="idea-submit">Add Idea</button>
        </div>
      </div>
    </div>`;
  }

  async function render(content) {
    const week = ymd(viewMonday);
    const [ideas, schedule] = await Promise.all([
      api(`/ideas?week=${week}`),
      api('/schedule'),
    ]);

    const approved = ideas.filter((i) => i.status === 'approved').length;
    const pending = ideas.filter((i) => i.status === 'pending').length;
    const ideaIds = new Set(ideas.map((i) => i.id));
    const scheduled = schedule.filter((s) => s.refType === 'idea' && ideaIds.has(s.refId)).length;

    // Rejected sort to the bottom; everything else by suggested date.
    const sorted = [...ideas].sort((a, b) => {
      if ((a.status === 'rejected') !== (b.status === 'rejected')) {
        return a.status === 'rejected' ? 1 : -1;
      }
      return a.suggestedDate.localeCompare(b.suggestedDate);
    });

    content.innerHTML = `
      <div class="page-header">
        <div class="tabs">
          <a class="tab active" href="#/weekly-plan">Weekly Plan</a>
          <a class="tab" href="#/script-generator">Script Generator</a>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" id="add-idea-btn">Add Idea</button>
          <button class="btn btn-primary" id="approve-all-btn" ${pending === 0 ? 'disabled' : ''}>Approve All</button>
        </div>
      </div>

      <div class="stats-row">
        <div class="card stat-card"><div class="stat-value mono">${ideas.length}</div><div class="stat-label mono">Ideas this week</div></div>
        <div class="card stat-card"><div class="stat-value mono">${approved}</div><div class="stat-label mono">Approved</div></div>
        <div class="card stat-card"><div class="stat-value mono">${pending}</div><div class="stat-label mono">Pending review</div></div>
        <div class="card stat-card"><div class="stat-value mono">${scheduled}</div><div class="stat-label mono">Scheduled</div></div>
      </div>

      <div class="week-nav">
        <button class="week-chevron" id="week-prev" aria-label="Previous week">&#8249;</button>
        <span class="week-label mono">${weekLabel(viewMonday)}</span>
        <button class="week-chevron" id="week-next" aria-label="Next week">&#8250;</button>
      </div>

      ${sorted.length
        ? `<div class="idea-grid">${sorted.map(ideaCard).join('')}</div>`
        : `<div class="card empty-state"><span class="eyebrow">No ideas yet</span>
             <p>Nothing planned for this week. Add an idea manually or assign Claude a research task.</p></div>`}

      ${addIdeaModal()}
    `;

    // --- week navigation
    $('#week-prev').addEventListener('click', () => {
      viewMonday.setDate(viewMonday.getDate() - 7);
      render(content);
    });
    $('#week-next').addEventListener('click', () => {
      viewMonday.setDate(viewMonday.getDate() + 7);
      render(content);
    });

    // --- approve / reject per card
    $$('.idea-card [data-action]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.closest('.idea-card').dataset.id;
        try {
          await api(`/ideas/${id}`, { method: 'PATCH', body: { status: btn.dataset.action } });
          await render(content);
          refreshShell();
        } catch (err) {
          toast(err.message);
        }
      });
    });

    // --- approve all pending
    $('#approve-all-btn').addEventListener('click', async () => {
      const pendingIdeas = ideas.filter((i) => i.status === 'pending');
      try {
        for (const idea of pendingIdeas) {
          await api(`/ideas/${idea.id}`, { method: 'PATCH', body: { status: 'approved' } });
        }
        toast(`Approved ${pendingIdeas.length} idea${pendingIdeas.length === 1 ? '' : 's'}`);
        await render(content);
        refreshShell();
      } catch (err) {
        toast(err.message);
      }
    });

    // --- add idea modal
    const overlay = $('#add-idea-modal');
    overlay.hidden = true;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.hidden = true; });
    $$('[data-close-modal]', overlay).forEach((b) => b.addEventListener('click', () => { overlay.hidden = true; }));

    $('#add-idea-btn').addEventListener('click', () => {
      overlay.hidden = false;
      $('#idea-title').focus();
    });

    $('#idea-submit').addEventListener('click', async () => {
      const title = $('#idea-title').value.trim();
      const angle = $('#idea-angle').value.trim();
      if (!title) { toast('Title is required'); return; }
      const sourceLinks = $('#idea-links').value
        .split(/\n+/)
        .map((u) => u.trim())
        .filter(Boolean)
        .map((url) => ({ url, note: '' }));
      try {
        await api('/ideas', {
          method: 'POST',
          body: {
            platform: $('#idea-platform').value,
            goal: $('#idea-goal').value,
            title,
            angle,
            format: $('#idea-format').value.trim(),
            suggestedDate: $('#idea-date').value,
            hookReference: $('#idea-hook').value.trim(),
            sourceLinks,
            createdBy: 'manual',
          },
        });
        overlay.hidden = true;
        toast('Idea added');
        // Jump to the week the idea landed in so it's visible immediately.
        viewMonday = mondayOf(new Date($('#idea-date').value + 'T00:00:00'));
        await render(content);
        refreshShell();
      } catch (err) {
        toast(err.message);
      }
    });
  }

  window.Pages['/weekly-plan'] = render;
})();
