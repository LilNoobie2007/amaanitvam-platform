import { team } from '../../../mocks/teams.js';

export default class MyTeam {
  render() {
    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Team</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/team
          </span>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded bg-pink-blush text-pink-ruby flex items-center justify-center font-display font-bold text-lg">
              ${team.name.charAt(0)}
            </div>
            <div>
              <h4 class="font-display font-semibold text-[18px] text-text-dark">${team.name}</h4>
              <span class="block text-[12px] text-text-light font-sans">Active Circle</span>
            </div>
          </div>

          <div class="space-y-3 font-sans text-[15px] text-text-muted">
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light">Team Lead</span>
              <span class="font-medium text-text-dark">${team.lead}</span>
            </div>
            
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light">Total Members</span>
              <span class="font-medium text-text-dark">${team.membersCount} active volunteers</span>
            </div>

            <div class="flex items-center justify-between py-1">
              <span class="text-text-light">Current Focus</span>
              <span class="font-medium text-text-dark">${team.currentProject}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
