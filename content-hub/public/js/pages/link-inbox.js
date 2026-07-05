/* Link Inbox — paste research URLs; Claude works through this queue,
   extracts hook patterns, and marks entries processed. */
(() => {
  const { api, toast, escapeHtml, refreshShell, $, $$ } = window.Hub;

  function truncateUrl(url, max = 64) {
    const clean = url.replace(/^https?:\/\/(www\.)?/, '');
    return clean.length > max ? clean.slice(0, max) + '…' : clean;
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
  }

  function row(entry) {
    const processed = entry.status === 'processed';
    return `
    <div class="inbox-row ${processed ? 'processed' : ''}" data-id="${entry.id}">
      <span class="status-dot ${processed ? 'approved' : 'pending'}" title="${entry.status}"></span>
      <a class="inbox-url" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener"
         title="${escapeHtml(entry.url)}">${escapeHtml(truncateUrl(entry.url))}</a>
      <span class="chip">${escapeHtml(entry.platform)}</span>
      <span class="inbox-note" title="${escapeHtml(entry.note)}">${escapeHtml(entry.note)}</span>
      <span class="chip ${processed ? '' : 'chip-inverted'}">${entry.status}</span>
      <span class="inbox-date mono">${fmtDate(entry.addedAt)}</span>
      <button class="btn btn-ghost btn-sm" data-toggle>${processed ? 'Reopen' : 'Mark processed'}</button>
    </div>`;
  }

  async function render(content) {
    const inbox = await api('/inbox');
    // Unprocessed first, newest first within each group.
    const sorted = [...inbox].sort((a, b) => {
      if ((a.status === 'processed') !== (b.status === 'processed')) {
        return a.status === 'processed' ? 1 : -1;
      }
      return b.addedAt.localeCompare(a.addedAt);
    });
    const unprocessed = inbox.filter((e) => e.status === 'unprocessed').length;

    content.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Link Inbox</h1>
        <span class="eyebrow">${unprocessed} unprocessed &middot; ${inbox.length} total</span>
      </div>

      <div class="card paste-box">
        <label class="field-label mono" for="paste-urls">Paste links <span class="optional">(one or many — newline or comma separated)</span></label>
        <textarea class="input textarea" id="paste-urls" rows="3"
          placeholder="https://www.tiktok.com/@.../video/...&#10;https://www.instagram.com/reel/..."></textarea>
        <div class="paste-row">
          <input class="input" id="paste-note" placeholder="Optional note — e.g. strong first-3s hook">
          <button class="btn btn-primary" id="add-links-btn">Add to Inbox</button>
        </div>
      </div>

      ${sorted.length
        ? `<div class="card inbox-list">${sorted.map(row).join('')}</div>`
        : `<div class="card empty-state"><span class="eyebrow">Inbox empty</span>
             <p>Paste reference links above — Claude processes them into idea hooks.</p></div>`}
    `;

    $('#add-links-btn').addEventListener('click', async () => {
      const urls = $('#paste-urls').value
        .split(/[\n,]+/)
        .map((u) => u.trim())
        .filter((u) => u.length > 0);
      if (!urls.length) { toast('Paste at least one URL'); return; }
      const note = $('#paste-note').value.trim();
      try {
        await api('/inbox', {
          method: 'POST',
          body: urls.map((url) => ({ url, note })),
        });
        toast(`Added ${urls.length} link${urls.length === 1 ? '' : 's'}`);
        await render(content);
        refreshShell();
      } catch (err) {
        toast(err.message);
      }
    });

    $$('.inbox-row [data-toggle]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const rowEl = btn.closest('.inbox-row');
        const processed = rowEl.classList.contains('processed');
        try {
          await api(`/inbox/${rowEl.dataset.id}`, {
            method: 'PATCH',
            body: { status: processed ? 'unprocessed' : 'processed' },
          });
          await render(content);
          refreshShell();
        } catch (err) {
          toast(err.message);
        }
      });
    });
  }

  window.Pages['/link-inbox'] = render;
})();
