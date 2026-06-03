export default class VolunteerBenefits {
  render() {
    const benefits = [
      {
        title: "Skill Development",
        description: "Develop hands-on expertise in grassroots education management, curriculum design, active public speaking, and community outreach coordinates."
      },
      {
        title: "Work On Real Initiatives",
        description: "Design and implement learning activities for Project Manthan, deploy code for Project Shiksha, or draft survey models for Project Pravah."
      },
      {
        title: "Collaborate With Like-Minded People",
        description: "Join a dedicated network of fellow student leaders and active youth who are committed to creating sustainable community changes."
      },
      {
        title: "Recognition of Contributions",
        description: "Receive signed recommendation letters and verified digital certificates mapped to actual, audit-ready hours of field service."
      }
    ];

    const benefitCards = benefits.map(b => `
      <div class="p-8 bg-white border border-stone-200/60 rounded flex flex-col justify-between hover:shadow-sm transition-all duration-300">
        <div>
          <h3 class="font-display font-semibold text-[22px] text-text-dark mb-4">
            ${b.title}
          </h3>
          <p class="font-sans text-[18px] leading-[1.7] text-text-muted">
            ${b.description}
          </p>
        </div>
        <div class="mt-6 flex items-center gap-2 text-pink-ruby text-[14px] font-interface font-semibold uppercase tracking-wider">
          <span>Verified Benefit</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    `).join('');

    return `
      <section class="py-24 px-6 bg-stone-50 text-text-dark">
        <div class="max-w-7xl mx-auto">
          <div class="max-w-3xl mb-16 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-2 block">
              What You Gain
            </span>
            <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.2] mb-6 text-text-dark">
              Tangible Outcomes of Service
            </h2>
            <p class="font-sans text-[18px] leading-[1.7] text-text-muted">
              We ensure our volunteers develop core capabilities during their stay. Your dedication translates directly into professional growth and real community milestones.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-load">
            ${benefitCards}
          </div>
        </div>
      </section>
    `;
  }
}
