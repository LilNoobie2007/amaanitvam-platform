import { profile } from '../../../mocks/profile.js';

export default class Profile {
  render() {
    const skillBadges = profile.skills.map(skill => `
      <span class="inline-block font-sans text-[14px] bg-stone-100 text-text-dark px-3 py-1 border border-stone-200 rounded-full">
        ${skill}
      </span>
    `).join('');

    const interestBadges = profile.interests.map(interest => `
      <span class="inline-block font-sans text-[14px] bg-pink-blush text-pink-ruby px-3 py-1 border border-pink-medium/30 rounded-full">
        ${interest}
      </span>
    `).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Volunteer Profile</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/profile
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <!-- Column 1: Details -->
          <div class="md:col-span-5 space-y-4">
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light">Full Name</span>
              <span class="font-display font-semibold text-[18px] text-text-dark">${profile.name}</span>
            </div>
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light">Email Address</span>
              <span class="font-sans text-[16px] text-text-dark">${profile.email}</span>
            </div>
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light">Volunteer Since</span>
              <span class="font-sans text-[16px] text-text-dark">${profile.volunteerSince}</span>
            </div>
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light">Active Role</span>
              <span class="font-sans text-[16px] text-text-dark font-medium">${profile.currentRole}</span>
            </div>
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light">Preferred Domain</span>
              <span class="font-sans text-[16px] text-text-dark">${profile.preferredDomain}</span>
            </div>
          </div>

          <!-- Column 2: Tags -->
          <div class="md:col-span-7 space-y-6">
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-2">My Skills</span>
              <div class="flex flex-wrap gap-2">
                ${skillBadges}
              </div>
            </div>
            
            <div>
              <span class="block text-[11px] uppercase tracking-widest text-text-light mb-2">Areas of Interest</span>
              <div class="flex flex-wrap gap-2">
                ${interestBadges}
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}
