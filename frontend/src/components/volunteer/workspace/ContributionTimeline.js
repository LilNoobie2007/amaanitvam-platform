export default class ContributionTimeline {
  render() {
    const levels = [
      {
        tier: "Level 1: New Contributor",
        description: "Completed general orientation workshop, setup dashboard space, and submitted interest preferences.",
        status: "Unlocked",
        date: "September 2025"
      },
      {
        tier: "Level 2: Active Contributor",
        description: "Logged 40+ hours of service, assigned to Project Manthan centers in South Delhi.",
        status: "Current Status",
        date: "May 2026"
      },
      {
        tier: "Level 3: Core Volunteer",
        description: "Unlocks at 100+ service hours. Propose, design, and manage curriculum modules or outreach drives.",
        status: "Locked",
        date: "Target: 58 Hours Left"
      },
      {
        tier: "Level 4: Lead Volunteer",
        description: "Unlocks at 250+ service hours. Mentor incoming contributors, audit hours, and lead specific regional chapters.",
        status: "Locked",
        date: "Locked"
      }
    ];

    const levelItems = levels.map((lvl, idx) => {
      const isCurrent = lvl.status === 'Current Status';
      const isUnlocked = lvl.status === 'Unlocked' || isCurrent;
      
      let nodeStyle = 'border-stone-300 bg-white text-stone-400';
      if (isCurrent) {
        nodeStyle = 'border-pink-ruby bg-pink-ruby text-white';
      } else if (isUnlocked) {
        nodeStyle = 'border-pink-medium bg-pink-blush text-pink-ruby';
      }

      return `
        <div class="relative flex gap-4 last:pb-0 pb-8 group">
          <!-- Step line connector -->
          ${idx < levels.length - 1 ? '<div class="absolute left-[9px] top-6 bottom-0 w-[1.5px] bg-stone-200"></div>' : ''}

          <!-- Node bubble -->
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-colors duration-300 ${nodeStyle}">
            ${isCurrent ? '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>' : ''}
          </div>

          <!-- Description details -->
          <div class="flex-1 -mt-1">
            <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
              <h4 class="font-display font-semibold text-[15px] ${isUnlocked ? 'text-text-dark' : 'text-text-light'} leading-snug">
                ${lvl.tier}
              </h4>
              <span class="font-sans text-[11px] ${isCurrent ? 'text-pink-ruby font-semibold' : 'text-text-light'}">${lvl.date}</span>
            </div>
            <p class="font-sans text-[13px] leading-relaxed ${isUnlocked ? 'text-text-muted' : 'text-text-light/80'}">
              ${lvl.description}
            </p>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Growth & Timeline</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            Ecosystem Levels
          </span>
        </div>

        <div class="relative pl-1">
          ${levelItems}
        </div>
      </div>
    `;
  }
}
