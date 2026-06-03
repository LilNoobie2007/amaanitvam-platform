import { profile } from '../../../mocks/profile.js';

export default class DashboardHero {
  render() {
    // Determine level badge colors
    let levelBadgeColor = 'bg-stone-100 text-stone-700 border-stone-200';
    if (profile.volunteerLevel === 'Active Contributor') {
      levelBadgeColor = 'bg-pink-blush text-pink-ruby border-pink-medium/30';
    } else if (profile.volunteerLevel === 'Core Volunteer') {
      levelBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
    } else if (profile.volunteerLevel === 'Lead Volunteer') {
      levelBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }

    return `
      <section class="relative bg-stone-900 text-white py-16 px-6 overflow-hidden">
        <!-- Overlay backdrop -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-stone-950/80"></div>
          <div class="absolute right-0 bottom-0 w-[50%] h-full bg-gradient-to-l from-pink-ruby/10 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-gold-satin px-2.5 py-0.5 border border-gold-satin/30 rounded-full">
                Volunteer Space
              </span>
              <span class="font-interface font-semibold text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded ${levelBadgeColor}">
                ${profile.volunteerLevel}
              </span>
            </div>
            
            <h1 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-tight mb-2 text-white">
              Welcome back, ${profile.name}
            </h1>
            
            <p class="font-sans text-[18px] text-stone-300">
              Track your initiatives, view applications, and manage your verified credentials.
            </p>
          </div>

          <div class="flex items-center gap-4">
            <button id="btn-logout" class="font-interface font-semibold text-[11px] uppercase tracking-widest px-5 py-3 rounded border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-all duration-300">
              Exit Portal
            </button>
          </div>
        </div>
      </section>
    `;
  }

  static init() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Clear mock auth state
        localStorage.setItem('amaanitvam_volunteer_logged_in', 'false');
        // Redirect to public volunteer page
        window.location.hash = '#/volunteer';
      });
    }
  }
}
