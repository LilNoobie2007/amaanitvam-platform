import { opportunities } from '../../mocks/opportunities.js';

export default class VolunteerOpportunities {
  render() {
    const cardItems = opportunities.map(opp => {
      const statusBadgeColor = opp.status === 'Open' 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/55' 
        : 'bg-stone-100 text-stone-500 border-stone-200';
        
      const modeBadgeColor = opp.mode === 'On-site' 
        ? 'bg-pink-blush text-pink-ruby border-pink-medium/30'
        : opp.mode === 'Hybrid'
          ? 'bg-amber-50 text-amber-800 border-amber-200'
          : 'bg-indigo-50 text-indigo-700 border-indigo-200';

      return `
        <div class="bg-white border border-stone-200/60 rounded p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300" data-opp-id="${opp.id}">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="font-interface font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1 border rounded ${modeBadgeColor}">
                ${opp.mode}
              </span>
              <span class="font-interface font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1 border rounded ${statusBadgeColor}">
                ${opp.status}
              </span>
              <span class="font-interface text-[11px] text-text-light ml-auto">
                ${opp.category}
              </span>
            </div>
            
            <h3 class="font-display font-semibold text-[22px] text-text-dark mb-3">
              ${opp.title}
            </h3>
            
            <p class="font-sans text-[16px] leading-[1.6] text-text-muted mb-6">
              ${opp.description}
            </p>
          </div>
          
          <div class="pt-6 border-t border-stone-100 flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-4 text-[14px]">
              <div>
                <span class="block text-[11px] uppercase tracking-wider text-text-light">Location</span>
                <span class="font-medium text-text-dark">${opp.location}</span>
              </div>
              <div>
                <span class="block text-[11px] uppercase tracking-wider text-text-light">Duration</span>
                <span class="font-medium text-text-dark">${opp.duration}</span>
              </div>
            </div>
            
            <button class="mt-4 w-full inline-flex items-center justify-center font-interface font-semibold text-[11px] uppercase tracking-widest py-3 rounded border border-pink-ruby/30 text-pink-ruby hover:bg-pink-ruby hover:text-white transition-all duration-300 btn-apply-opp" data-opp-title="${opp.title}">
              Apply For Role
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="py-24 px-6 bg-stone-50 text-text-dark scroll-mt-20" id="opportunities-list">
        <div class="max-w-7xl mx-auto">
          <div class="max-w-3xl mb-16 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-2 block">
              Current Openings
            </span>
            <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.2] mb-6 text-text-dark">
              Find Your Place in Our Circle
            </h2>
            <p class="font-sans text-[18px] leading-[1.7] text-text-muted">
              Select an initiative that aligns with your domain preference, location requirements, and availability. We support flexible commitment timelines for students and working professionals alike.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-load" id="opps-grid">
            ${cardItems}
          </div>
        </div>
      </section>
    `;
  }

  static init() {
    // Set up click handlers for 'Apply For Role' buttons
    const buttons = document.querySelectorAll('.btn-apply-opp');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-opp-title');
        
        // Scroll to the application form
        const formSection = document.getElementById('volunteer-apply-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
          
          // Try to select the preferred domain dropdown
          setTimeout(() => {
            const domainSelect = document.getElementById('form-domain');
            if (domainSelect) {
              // Try to match the title or category
              if (title.includes('Teaching')) {
                domainSelect.value = 'Education & Mentorship';
              } else if (title.includes('Tech')) {
                domainSelect.value = 'Technology';
              } else if (title.includes('Outreach')) {
                domainSelect.value = 'Community Outreach';
              } else if (title.includes('Content')) {
                domainSelect.value = 'Communications & Content';
              }
              // Dispatch change event to let any handlers know
              domainSelect.dispatchEvent(new Event('change'));
              domainSelect.focus();
            }
          }, 600);
        }
      });
    });
  }
}
