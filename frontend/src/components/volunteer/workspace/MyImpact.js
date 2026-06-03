import { impact } from '../../../mocks/impact.js';

export default class MyImpact {
  render() {
    return `
      <div class="bg-white border border-stone-200/60 rounded p-8 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Personal Impact</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/impact
          </span>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y-0 md:divide-x divide-stone-100">
          <!-- Hours -->
          <div class="text-center md:px-4">
            <span class="font-display font-bold text-4xl text-pink-ruby block mb-1">
              ${impact.hoursContributed}
            </span>
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-text-muted">
              Hours Donated
            </span>
            <p class="font-sans text-[13px] text-text-light mt-1">Verified field syncs</p>
          </div>

          <!-- Students -->
          <div class="text-center md:px-4">
            <span class="font-display font-bold text-4xl text-text-dark block mb-1">
              ${impact.studentsReached}
            </span>
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-text-muted">
              Students Reached
            </span>
            <p class="font-sans text-[13px] text-text-light mt-1">Direct classroom learners</p>
          </div>

          <!-- Events -->
          <div class="text-center md:px-4">
            <span class="font-display font-bold text-4xl text-text-dark block mb-1">
              ${impact.eventsParticipated}
            </span>
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-text-muted">
              Events Joined
            </span>
            <p class="font-sans text-[13px] text-text-light mt-1">Outreach and drives</p>
          </div>

          <!-- Projects -->
          <div class="text-center md:px-4">
            <span class="font-display font-bold text-4xl text-pink-ruby block mb-1">
              ${impact.projectsSupported}
            </span>
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-text-muted">
              Projects Supported
            </span>
            <p class="font-sans text-[13px] text-text-light mt-1">Active team footprints</p>
          </div>
        </div>
      </div>
    `;
  }
}
