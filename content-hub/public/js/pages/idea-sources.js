/* Idea Sources — every sourceLink across all ideas, grouped by platform.
   One place to scan visual references before a shoot day. */
(() => {
  const { api, escapeHtml } = window.Hub;

  const PLATFORM_ORDER = ['tiktok', 'instagram', 'rednote', 'facebook', 'shopee', 'other'];

  async function render(content) {
    const ideas = await api('/ideas');

    // Flatten: one entry per sourceLink, keeping the parent idea.
    const links = ideas.flatMap((idea) =>
      (idea.sourceLinks || []).map((link) => ({ link, idea })),
    );

    const groups = new Map();
    for (const item of links) {
      const key = item.link.platform || 'other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    const orderedKeys = [...groups.keys()].sort((a, b) => {
      const ia = PLATFORM_ORDER.indexOf(a); const ib = PLATFORM_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    content.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Idea Sources</h1>
        <span class="eyebrow">${links.length} reference link${links.length === 1 ? '' : 's'} across ${ideas.length} ideas</span>
      </div>

      ${links.length ? orderedKeys.map((platform) => `
        <section class="source-group">
          <div class="source-group-head">
            <span class="chip chip-inverted">${escapeHtml(platform)}</span>
            <span class="eyebrow">${groups.get(platform).length} link${groups.get(platform).length === 1 ? '' : 's'}</span>
          </div>
          <div class="card source-list">
            ${groups.get(platform).map(({ link, idea }) => `
              <a class="source-row" href="${escapeHtml(link.url)}" target="_blank" rel="noopener">
                <span class="source-url mono">${escapeHtml(link.url.replace(/^https?:\/\/(www\.)?/, ''))}</span>
                <span class="source-note">${escapeHtml(link.note)}</span>
                <span class="source-parent">${escapeHtml(idea.title)}</span>
                <span class="chip-ext mono">&#8599;</span>
              </a>`).join('')}
          </div>
        </section>`).join('')
      : `<div class="card empty-state">
           <span class="eyebrow">No source links yet</span>
           <p>Source links attached to ideas will collect here, grouped by platform.</p>
         </div>`}
    `;
  }

  window.Pages['/idea-sources'] = render;
})();
