/* AI Activity — task queue + activity log on one page. */
(() => {
  const { api, toast, escapeHtml, refreshShell, $$ } = window.Hub;

  function fmtTime(iso) {
    const d = new Date(iso);
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${MONTHS[d.getMonth()]} ${d.getDate()} ${hh}:${mm}`;
  }

  const STATUS_LABEL = { pending: 'pending', in_progress: 'in progress', done: 'done' };

  function taskCard(task) {
    const done = task.status === 'done';
    return `
    <div class="card task-card ${done ? 'done' : ''}" data-id="${task.id}">
      <span class="status-dot ${done ? 'approved' : 'pending'} ${task.status === 'in_progress' ? 'dot-pulse' : ''}"></span>
      <div class="task-body">
        <div class="task-desc">${escapeHtml(task.description)}</div>
        <div class="task-meta mono">${escapeHtml(task.assignedTo)} &middot; ${fmtTime(task.createdAt)}</div>
      </div>
      <span class="chip ${task.status === 'in_progress' ? 'chip-inverted' : ''}">${STATUS_LABEL[task.status]}</span>
      ${done ? '' : '<button class="btn btn-ghost btn-sm" data-done>Mark done</button>'}
    </div>`;
  }

  async function render(content) {
    const [tasks, log] = await Promise.all([api('/tasks'), api('/ai-log')]);

    // Open tasks first (in_progress above pending), then done; newest first within groups.
    const rank = { in_progress: 0, pending: 1, done: 2 };
    const sortedTasks = [...tasks].sort(
      (a, b) => rank[a.status] - rank[b.status] || b.createdAt.localeCompare(a.createdAt),
    );
    const openCount = tasks.filter((t) => t.status !== 'done').length;
    const logDesc = [...log].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    content.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">AI Activity</h1>
        <span class="eyebrow">${openCount} open task${openCount === 1 ? '' : 's'} &middot; ${log.length} log entries</span>
      </div>

      <section class="activity-section">
        <div class="section-head"><span class="eyebrow">Task queue</span></div>
        ${sortedTasks.length
          ? `<div class="task-stack">${sortedTasks.map(taskCard).join('')}</div>`
          : `<div class="card empty-state"><span class="eyebrow">Queue empty</span>
               <p>Assign Claude a task with the button in the sidebar.</p></div>`}
      </section>

      <section class="activity-section">
        <div class="section-head"><span class="eyebrow">Activity log</span></div>
        ${logDesc.length
          ? `<div class="card log-list">
              ${logDesc.map((entry) => `
                <div class="log-row">
                  <span class="chip ${entry.agent === 'claude' ? 'chip-inverted' : ''}">${escapeHtml(entry.agent)}</span>
                  <span class="log-action">${escapeHtml(entry.action)}</span>
                  <span class="log-time mono">${fmtTime(entry.timestamp)}</span>
                </div>`).join('')}
             </div>`
          : `<div class="card empty-state"><span class="eyebrow">No activity yet</span><p>Agent actions will be logged here.</p></div>`}
      </section>
    `;

    $$('.task-card [data-done]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.closest('.task-card').dataset.id;
        try {
          await api(`/tasks/${id}`, { method: 'PATCH', body: { status: 'done' } });
          toast('Task marked done');
          await render(content);
          refreshShell();
        } catch (err) {
          toast(err.message);
        }
      });
    });
  }

  window.Pages['/ai-activity'] = render;
})();
