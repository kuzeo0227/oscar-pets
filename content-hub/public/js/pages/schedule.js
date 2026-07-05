/* Schedule — manual reference tracking of suggested vs actual post dates.
   Rows are created automatically when ideas are approved. */
(() => {
  const { api, toast, escapeHtml, $$ } = window.Hub;

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function fmtYmd(ymdStr) {
    if (!ymdStr) return '';
    const d = new Date(ymdStr + 'T00:00:00');
    return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
  }

  function titleFor(entry, ideas, scripts) {
    if (entry.refType === 'idea') {
      const idea = ideas.find((i) => i.id === entry.refId);
      return idea ? idea.title : '(deleted idea)';
    }
    const script = scripts.find((s) => s.id === entry.refId);
    return script ? script.topic : '(deleted script)';
  }

  async function render(content) {
    const data = await api('/data');
    const { schedule, ideas, scripts } = data;

    const sorted = [...schedule].sort((a, b) => a.suggestedDate.localeCompare(b.suggestedDate));
    const posted = schedule.filter((s) => s.actualPostedDate).length;

    content.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Schedule</h1>
        <span class="eyebrow">${posted} posted &middot; ${schedule.length} planned</span>
      </div>

      ${sorted.length ? `
      <div class="card schedule-table">
        <div class="schedule-head mono">
          <span></span><span>Title</span><span>Type</span><span>Platform</span>
          <span>Suggested</span><span>Posted</span>
        </div>
        ${sorted.map((entry) => `
          <div class="schedule-row ${entry.actualPostedDate ? 'posted' : ''}" data-id="${entry.id}">
            <span class="status-dot ${entry.actualPostedDate ? 'approved' : 'pending'}"
                  title="${entry.actualPostedDate ? 'posted' : 'not posted yet'}"></span>
            <span class="schedule-title">${escapeHtml(titleFor(entry, ideas, scripts))}</span>
            <span class="chip">${entry.refType}</span>
            <span class="chip">${escapeHtml(entry.platform)}</span>
            <span class="schedule-date mono">${fmtYmd(entry.suggestedDate)}</span>
            <input class="input date-inline" type="date" value="${entry.actualPostedDate || ''}"
                   aria-label="Actual posted date">
          </div>`).join('')}
      </div>` : `
      <div class="card empty-state">
        <span class="eyebrow">Nothing scheduled</span>
        <p>Approve ideas on the Weekly Plan to put them on the schedule.</p>
      </div>`}
    `;

    $$('.schedule-row .date-inline').forEach((input) => {
      input.addEventListener('change', async () => {
        const rowEl = input.closest('.schedule-row');
        try {
          await api(`/schedule/${rowEl.dataset.id}`, {
            method: 'PATCH',
            body: { actualPostedDate: input.value || null },
          });
          toast(input.value ? `Logged posted date ${fmtYmd(input.value)}` : 'Posted date cleared');
          render(content);
        } catch (err) {
          toast(err.message);
        }
      });
    });
  }

  window.Pages['/schedule'] = render;
})();
