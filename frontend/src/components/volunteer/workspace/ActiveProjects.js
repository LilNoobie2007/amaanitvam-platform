import { projects } from '../../../mocks/projects.js';

export default class ActiveProjects {
  render() {
    const projectCards = projects.map(proj => {
      const isUpcoming = proj.status === 'Upcoming';
      const statusBadge = isUpcoming 
        ? 'bg-amber-50 text-amber-800 border-amber-200' 
        : 'bg-emerald-50 text-emerald-800 border-emerald-200';
      
      const badgeText = proj.status;

      return `
        <div class="p-6 bg-stone-50 border border-stone-200 rounded hover:shadow-sm transition-all duration-300">
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light">
              ${proj.category}
            </span>
            <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge}">
              ${badgeText}
            </span>
          </div>

          <h4 class="font-display font-semibold text-[22px] text-text-dark mb-2">
            ${proj.title}
          </h4>

          <div class="space-y-3 font-sans text-[15px] text-text-muted mt-4">
            <!-- Role -->
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Assigned Role</span>
              <span class="font-medium text-text-dark">${proj.role}</span>
            </div>
            
            <!-- Tasks -->
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Pending Tasks</span>
              <span class="font-medium ${proj.pendingTasksCount > 0 ? 'text-pink-ruby font-semibold' : 'text-text-dark'}">${proj.pendingTasksCount} Tasks</span>
            </div>

            <!-- Next Session -->
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Next Activity</span>
              <span class="font-medium text-text-dark">${proj.nextSession}</span>
            </div>

            <!-- Attendance -->
            <div class="flex items-center justify-between py-1">
              <span class="text-text-light text-[14px]">Attendance Rate</span>
              <span class="font-medium text-text-dark">${proj.attendanceRate}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Active Projects</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/projects
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${projectCards}
        </div>
      </div>
    `;
  }
}
