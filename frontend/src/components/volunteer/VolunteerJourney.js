export default class VolunteerJourney {
  render() {
    const steps = [
      {
        num: "01",
        title: "Apply",
        subtitle: "Express Interest",
        description: "Submit our comprehensive application form detailing your background, preferred domain, availability, and active skills."
      },
      {
        num: "02",
        title: "Review",
        subtitle: "Compatibility Matching",
        description: "Our student leadership team reviews submissions against ongoing project needs and gets in touch within 5 working days."
      },
      {
        num: "03",
        title: "Onboard",
        subtitle: "Orientation & Training",
        description: "Attend a monthly sync session to align on our operational methodologies, safety guidelines, and program kits."
      },
      {
        num: "04",
        title: "Volunteer",
        subtitle: "Active Engagement",
        description: "Take charge of learning centers or community campaigns, reporting progress through the Amaanitvam dashboard."
      },
      {
        num: "05",
        title: "Grow",
        subtitle: "Leadership Path",
        description: "Progress from active contributor to core project lead, earning verified certificates and real initiative ownership."
      }
    ];

    const timelineItems = steps.map((step, idx) => `
      <div class="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 scroll-reveal" style="transition-delay: ${idx * 100}ms">
        <!-- Node indicator -->
        <div class="flex items-center md:justify-center relative z-10">
          <div class="w-14 h-14 rounded-full border border-pink-ruby/30 bg-white flex items-center justify-center font-display font-bold text-pink-ruby text-lg shadow-sm">
            ${step.num}
          </div>
          <!-- Vertical line connector for mobile -->
          ${idx < steps.length - 1 ? '<div class="absolute top-14 left-7 w-[1px] h-16 bg-stone-200 md:hidden"></div>' : ''}
        </div>
        
        <!-- Text content -->
        <div class="flex-1 pb-10 md:pb-0">
          <span class="block font-interface font-semibold text-[12px] uppercase tracking-widest text-gold-ochre mb-1">
            ${step.subtitle}
          </span>
          <h3 class="font-display font-semibold text-[22px] text-text-dark mb-2">
            ${step.title}
          </h3>
          <p class="font-sans text-[18px] leading-[1.7] text-text-muted max-w-2xl">
            ${step.description}
          </p>
        </div>
      </div>
    `).join('');

    return `
      <section class="py-24 px-6 bg-white text-text-dark">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-2 block">
              The Path Forward
            </span>
            <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.2] mb-6 text-text-dark">
              Your Journey as a Volunteer
            </h2>
            <p class="font-sans text-[18px] leading-[1.7] text-text-muted max-w-2xl mx-auto">
              Our onboarding process is deliberate. We prepare you with toolkits and guidance so you can make a meaningful impact from day one.
            </p>
          </div>
          
          <!-- Timeline Rail Container -->
          <div class="relative pl-6 md:pl-0 space-y-12 md:space-y-16">
            <!-- Central Line Connector for desktop -->
            <div class="absolute left-7 top-8 bottom-8 w-[1px] bg-stone-200 hidden md:block z-0"></div>
            
            ${timelineItems}
          </div>
        </div>
      </section>
    `;
  }
}
