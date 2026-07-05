/* Past Scripts — archived briefs, read-only view + re-export. */
(() => {
  const { api, toast, escapeHtml, $, $$ } = window.Hub;

  function fmtDate(iso) {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(iso);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  async function render(content) {
    const scripts = await api('/scripts');
    const archived = scripts
      .filter((s) => s.archived)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    content.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Past Scripts</h1>
        <span class="eyebrow">${archived.length} archived</span>
      </div>

      ${archived.length ? `
      <div class="card archive-list">
        ${archived.map((s) => `
          <div class="archive-row" data-id="${s.id}">
            <div class="archive-info">
              <div class="archive-topic">${escapeHtml(s.topic)}</div>
              <div class="archive-meta mono">${fmtDate(s.createdAt)} &middot; ${s.hashtags.length} hashtags</div>
            </div>
            <button class="btn btn-ghost btn-sm" data-view>View brief</button>
            <button class="btn btn-secondary btn-sm" data-export>Export .docx</button>
          </div>`).join('')}
      </div>` : `
      <div class="card empty-state">
        <span class="eyebrow">Archive empty</span>
        <p>Scripts saved to archive from the Script Generator will appear here.</p>
      </div>`}

      <div class="modal-overlay" id="brief-modal" hidden>
        <div class="modal modal-lg" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h2 class="modal-title" id="brief-modal-title"></h2>
            <button class="modal-close" data-close-modal aria-label="Close">&times;</button>
          </div>
          <div class="modal-body brief-modal-body" id="brief-modal-body"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-close-modal>Close</button>
            <button class="btn btn-primary" id="brief-modal-export">Export .docx</button>
          </div>
        </div>
      </div>
    `;

    const overlay = $('#brief-modal');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.hidden = true; });
    $$('[data-close-modal]', overlay).forEach((b) => b.addEventListener('click', () => { overlay.hidden = true; }));

    let modalScriptId = null;

    async function doExport(id) {
      try {
        const filename = await window.Hub.downloadDocx(id);
        toast(`Exported ${filename}`);
      } catch (err) {
        toast(err.message);
      }
    }

    $$('.archive-row').forEach((row) => {
      const script = archived.find((s) => s.id === row.dataset.id);
      row.querySelector('[data-view]').addEventListener('click', () => {
        modalScriptId = script.id;
        $('#brief-modal-title').textContent = script.topic;
        $('#brief-modal-body').innerHTML = window.Hub.scriptBriefSections(script);
        overlay.hidden = false;
      });
      row.querySelector('[data-export]').addEventListener('click', () => doExport(script.id));
    });

    $('#brief-modal-export').addEventListener('click', () => {
      if (modalScriptId) doExport(modalScriptId);
    });
  }

  window.Pages['/past-scripts'] = render;
})();
