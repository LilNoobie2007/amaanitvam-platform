export default class VolunteerHero {
  render() {
    return `
      <section class="relative min-h-[75vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden py-24 px-6">
        <!-- Background Image overlay with breath animation -->
        <div class="absolute inset-0 z-0">
          <img src="/field-children.jpg" alt="Amaanitvam community initiative" class="w-full h-full object-cover opacity-35 filter brightness-90 animate-breath">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto text-center scroll-reveal">
          <span class="inline-block font-interface font-semibold text-[11px] uppercase tracking-widest text-gold-satin mb-4 px-3 py-1 border border-gold-satin/30 rounded-full">
            Join Our Volunteer Ecosystem
          </span>
          <h1 class="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 text-white">
            Translate Potential <br>Into Possibility
          </h1>
          <p class="font-sans text-[18px] md:text-[20px] leading-[1.7] text-stone-300 max-w-2xl mx-auto mb-10">
            Amaanitvam is a student-led foundation channeling grassroots energy to uplift underserved communities. We don't just ask for helpers; we invite partners in growth.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#opportunities-list" class="w-full sm:w-auto inline-flex items-center justify-center font-interface font-semibold text-[12px] uppercase tracking-widest px-8 py-4 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 transition-all duration-300 shadow-lg">
              Explore Opportunities
            </a>
            <a href="#/volunteer/dashboard" class="w-full sm:w-auto inline-flex items-center justify-center font-interface font-semibold text-[12px] uppercase tracking-widest px-8 py-4 rounded border border-white/20 text-white hover:bg-white/10 transition-all duration-300">
              Access Dashboard
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
