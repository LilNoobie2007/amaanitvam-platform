import { notifications } from '../../../mocks/notifications.js';

export default class NotificationsCenter {
  render() {
    const feedItems = notifications.map(notif => {
      // Priority styles
      let priorityDotColor = 'bg-stone-300';
      let priorityTextColor = 'text-text-light border-stone-200 bg-stone-50';
      if (notif.priority === 'High') {
        priorityDotColor = 'bg-pink-ruby animate-pulse';
        priorityTextColor = 'text-pink-ruby border-pink-medium/30 bg-pink-blush/60';
      } else if (notif.priority === 'Medium') {
        priorityDotColor = 'bg-gold-satin';
        priorityTextColor = 'text-gold-ochre border-gold-satin/30 bg-gold-light/60';
      }

      return `
        <div class="flex gap-4 pb-5 border-b border-stone-100 last:border-0 last:pb-0">
          <!-- Priority Status Node -->
          <div class="mt-2 shrink-0">
            <div class="w-2.5 h-2.5 rounded-full ${priorityDotColor}"></div>
          </div>

          <!-- Notification Details -->
          <div class="flex-1">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h4 class="font-display font-semibold text-[15px] text-text-dark leading-snug">
                ${notif.title}
              </h4>
              <div class="flex items-center gap-2">
                <span class="font-interface font-semibold text-[8px] uppercase tracking-wider px-2 py-0.5 border rounded-full ${priorityTextColor}">
                  ${notif.priority}
                </span>
                <span class="font-sans text-[12px] text-text-light">${notif.timestamp}</span>
              </div>
            </div>
            
            <p class="font-sans text-[14px] leading-relaxed text-text-muted">
              ${notif.description}
            </p>
            
            <span class="inline-block mt-2 font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              ${notif.type}
            </span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Notifications</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/notifications
          </span>
        </div>

        <div class="space-y-5">
          ${feedItems}
        </div>
      </div>
    `;
  }
}
