import { tasks as mockTasks } from '../../../mocks/tasks.js';

export default class MyTasks {
  render() {
    // Check if task states are initialized in sessionStorage, if not, write them
    let storedTasksJson = sessionStorage.getItem('amaanitvam_my_tasks');
    let taskList = [];
    if (!storedTasksJson) {
      taskList = [...mockTasks];
      sessionStorage.setItem('amaanitvam_my_tasks', JSON.stringify(taskList));
    } else {
      try {
        taskList = JSON.parse(storedTasksJson);
      } catch (err) {
        taskList = [...mockTasks];
      }
    }

    const taskItems = taskList.map(task => {
      const isCompleted = task.status === 'Completed';
      const statusBadge = isCompleted 
        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
        : task.status === 'In Progress'
          ? 'bg-amber-50 text-amber-800 border-amber-200'
          : 'bg-stone-100 text-stone-600 border-stone-200';

      return `
        <div class="flex items-start justify-between p-4 border border-stone-200 rounded hover:bg-stone-50/50 transition-colors" data-task-id="${task.id}">
          <div class="flex items-start gap-3">
            <input type="checkbox" ${isCompleted ? 'checked' : ''} class="mt-1 w-4 h-4 border-stone-300 rounded text-pink-ruby focus:ring-pink-ruby cursor-pointer chk-task-status" data-task-id="${task.id}">
            <div>
              <h4 class="font-display font-semibold text-[16px] text-text-dark leading-snug ${isCompleted ? 'line-through text-text-light' : ''}">
                ${task.title}
              </h4>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[12px] text-text-light font-sans">
                <span>By: ${task.assignedBy}</span>
                <span class="text-stone-300">•</span>
                <span>Due: ${task.dueDate}</span>
                <span class="text-stone-300">•</span>
                <span class="text-text-muted font-medium">${task.project}</span>
              </div>
            </div>
          </div>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge} select-none">
            ${task.status}
          </span>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Tasks</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/tasks
          </span>
        </div>

        <div class="space-y-4" id="tasks-list-container">
          ${taskItems}
        </div>
      </div>
    `;
  }

  static init() {
    const checkboxes = document.querySelectorAll('.chk-task-status');
    checkboxes.forEach(chk => {
      chk.addEventListener('change', (e) => {
        const taskId = e.currentTarget.getAttribute('data-task-id');
        const checked = e.currentTarget.checked;
        
        try {
          const stored = JSON.parse(sessionStorage.getItem('amaanitvam_my_tasks') || '[]');
          const updated = stored.map(t => {
            if (t.id === taskId) {
              return { ...t, status: checked ? 'Completed' : 'Pending' };
            }
            return t;
          });
          sessionStorage.setItem('amaanitvam_my_tasks', JSON.stringify(updated));
          
          // Dynamically toggle line-through on title and update status badge in UI
          const card = document.querySelector(`[data-task-id="${taskId}"]`);
          if (card) {
            const title = card.querySelector('h4');
            if (title) {
              if (checked) title.classList.add('line-through', 'text-text-light');
              else title.classList.remove('line-through', 'text-text-light');
            }
            const badge = card.querySelector('.font-interface');
            if (badge) {
              badge.textContent = checked ? 'Completed' : 'Pending';
              badge.className = checked 
                ? 'font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full bg-emerald-50 text-emerald-800 border-emerald-200 select-none'
                : 'font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full bg-stone-100 text-stone-600 border-stone-200 select-none';
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
}
