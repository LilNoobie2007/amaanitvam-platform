export default class WhyAmaanitvam {
  render() {
    return `
      <section class="py-24 px-6 bg-stone-50 text-text-dark">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Side: Editorial Philosophy -->
            <div class="lg:col-span-5 scroll-reveal">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-2 block">
                Why Amaanitvam?
              </span>
              <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.2] mb-6 text-text-dark">
                More Than Helping.<br>Real Ownership.
              </h2>
              <p class="font-sans text-[18px] leading-[1.7] text-text-muted mb-8">
                Most organizations view volunteers simply as hands to complete predefined tasks. We believe in creating an ecosystem where young leaders have the agency, support, and ownership to build actual initiatives from the ground up.
              </p>
              <div class="p-6 border-l-2 border-pink-medium bg-pink-blush/30 rounded-r-lg">
                <p class="font-display italic text-[18px] leading-[1.7] text-text-muted">
                  "At Amaanitvam, we are student-led and community-focused. You aren't just filling a slot; you are designing a pathway for progress."
                </p>
              </div>
            </div>

            <!-- Right Side: Four Pillars -->
            <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 stagger-load">
              
              <!-- Pillar 1 -->
              <div class="p-8 bg-white border border-stone-200/60 rounded shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-12 h-12 flex items-center justify-center bg-pink-blush rounded text-pink-ruby mb-6">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="font-display font-semibold text-[22px] text-text-dark mb-3">Student-Led</h3>
                <p class="font-sans text-[16px] leading-[1.6] text-text-light">
                  Founded and driven entirely by students. We understand youth aspirations, challenges, and the collective desire to bring social change.
                </p>
              </div>

              <!-- Pillar 2 -->
              <div class="p-8 bg-white border border-stone-200/60 rounded shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-12 h-12 flex items-center justify-center bg-gold-light rounded text-gold-ochre mb-6">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.244a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <h3 class="font-display font-semibold text-[22px] text-text-dark mb-3">Grassroots Impact</h3>
                <p class="font-sans text-[16px] leading-[1.6] text-text-light">
                  No ivory towers. We work directly inside community centers, public schools, and neighborhoods to address immediate educational and developmental gaps.
                </p>
              </div>

              <!-- Pillar 3 -->
              <div class="p-8 bg-white border border-stone-200/60 rounded shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-12 h-12 flex items-center justify-center bg-pink-blush rounded text-pink-ruby mb-6">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <h3 class="font-display font-semibold text-[22px] text-text-dark mb-3">Direct Engagement</h3>
                <p class="font-sans text-[16px] leading-[1.6] text-text-light">
                  Build meaningful human connections. Work hand-in-hand with our learners and families to experience the direct ripple effect of your efforts.
                </p>
              </div>

              <!-- Pillar 4 -->
              <div class="p-8 bg-white border border-stone-200/60 rounded shadow-sm hover:shadow-md transition-all duration-300">
                <div class="w-12 h-12 flex items-center justify-center bg-gold-light rounded text-gold-ochre mb-6">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 class="font-display font-semibold text-[22px] text-text-dark mb-3">Real Ownership</h3>
                <p class="font-sans text-[16px] leading-[1.6] text-text-light">
                  Propose, design, and manage projects. We provide the mentorship framework and resources; you bring the leadership and execution.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    `;
  }
}
