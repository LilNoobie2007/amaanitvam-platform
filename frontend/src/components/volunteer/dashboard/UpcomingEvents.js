import { events } from '../../../mocks/events.js';

export default class UpcomingEvents {
  render() {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const eventItems = events.map(evt => {
      // Parse dates like "2026-06-15"
      const dateParts = evt.date.split('-');
      const year = dateParts[0];
      const monthIdx = parseInt(dateParts[1], 10) - 1;
      const day = dateParts[2];
      const monthStr = months[monthIdx] || 'MTH';

      return `
        <div class="flex items-start gap-4 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
          <!-- Calendar square -->
          <div class="w-14 h-16 bg-stone-50 border border-stone-200 flex flex-col items-center justify-center rounded select-none shrink-0">
            <span class="font-interface font-bold text-[10px] text-pink-ruby tracking-wider leading-none uppercase mb-1">${monthStr}</span>
            <span class="font-display font-bold text-xl text-text-dark leading-none">${day}</span>
          </div>

          <!-- Event details -->
          <div class="flex-1">
            <h4 class="font-display font-semibold text-[16px] text-text-dark leading-snug mb-1">
              ${evt.title}
            </h4>
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[13px] text-text-light font-sans">
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-text-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ${evt.time}
              </span>
              <span class="hidden sm:inline text-stone-300">•</span>
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-text-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.244a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                ${evt.location}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Upcoming Events</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/events
          </span>
        </div>

        <div class="space-y-6">
          ${eventItems.length > 0 ? eventItems : `
            <p class="text-center py-6 text-text-light font-sans text-[15px]">No upcoming events listed.</p>
          `}
        </div>
      </div>
    `;
  }
}
