import { profile } from '../../../mocks/profile.js';

export default class MyContributions {
  render() {
    return `
      <section class="py-12 bg-stone-50 border-y border-stone-200/60 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-0 md:divide-x divide-stone-200/80">
            
            <!-- Stat 1: Total Hours -->
            <div class="text-center md:px-6">
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Total Hours</span>
              <span class="font-display font-semibold text-3xl sm:text-4xl text-text-dark">${profile.totalHours} Hrs</span>
              <p class="font-sans text-[13px] text-text-muted mt-1">Verified community service</p>
            </div>

            <!-- Stat 2: Active Role -->
            <div class="text-center md:px-6 pt-4 md:pt-0">
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Ecosystem Level</span>
              <span class="font-display font-semibold text-xl sm:text-2xl text-text-dark block h-10 flex items-center justify-center">${profile.volunteerLevel}</span>
              <p class="font-sans text-[13px] text-text-muted mt-1">Tier-based status</p>
            </div>

            <!-- Stat 3: Volunteer Since -->
            <div class="text-center md:px-6 pt-4 md:pt-0">
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Member Since</span>
              <span class="font-display font-semibold text-2xl sm:text-3xl text-text-dark block h-10 flex items-center justify-center">${profile.volunteerSince}</span>
              <p class="font-sans text-[13px] text-text-muted mt-1">Grassroots tenure</p>
            </div>

            <!-- Stat 4: Preferred Domain -->
            <div class="text-center md:px-6 pt-4 md:pt-0">
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Domain Focus</span>
              <span class="font-display font-semibold text-lg sm:text-xl text-text-dark block h-10 flex items-center justify-center">${profile.preferredDomain}</span>
              <p class="font-sans text-[13px] text-text-muted mt-1">Primary area of action</p>
            </div>

          </div>
        </div>
      </section>
    `;
  }
}
