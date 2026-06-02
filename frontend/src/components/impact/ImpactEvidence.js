export default class ImpactEvidence {
  render() {
    return `
      <section id="impact-evidence" class="relative py-28 bg-stone-50 overflow-hidden border-t border-b border-stone-200/20 z-20 select-none">
        
        <!-- Faint background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <div class="max-w-2xl mx-auto mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Audited Progress</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">
              Verified Evidence
            </h2>
            <p class="font-sans text-[14px] text-text-muted mt-3 font-light leading-relaxed">
              Every data point represents a verified milestone achieved directly on the ground through sustained community support.
            </p>
          </div>

          <!-- Institutional Presentation Grid (Alternating Left Alignments with high whitespace) -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8 select-none text-left stagger-container">
            
            <!-- Metric 1: 60+ Children Supported -->
            <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-4xl text-text-dark">60+</span>
              <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-stone-500 mt-2">Children Supported</h4>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">Through education programs</p>
              <p class="font-sans text-[11px] text-stone-400 italic mt-3 font-light leading-relaxed">
                Learning begins when opportunity becomes accessible.
              </p>
            </div>

            <!-- Metric 2: 45+ Children Benefiting -->
            <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-4xl text-text-dark">45+</span>
              <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-stone-500 mt-2">Children Benefiting</h4>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">From learning initiatives</p>
              <p class="font-sans text-[11px] text-stone-400 italic mt-3 font-light leading-relaxed">
                Growth follows when learners receive guidance and support.
              </p>
            </div>

            <!-- Metric 3: 23+ Young Lives Reached -->
            <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-4xl text-text-dark">23+</span>
              <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-stone-500 mt-2">Young Lives Reached</h4>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">Through community outreach</p>
              <p class="font-sans text-[11px] text-stone-400 italic mt-3 font-light leading-relaxed">
                Communities grow stronger when participation increases.
              </p>
            </div>

            <!-- Metric 4: 30+ Children Provided Clothing -->
            <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-4xl text-text-dark">30+</span>
              <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-stone-500 mt-2">Provided Clothing</h4>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">Essential clothing support</p>
              <p class="font-sans text-[11px] text-stone-400 italic mt-3 font-light leading-relaxed">
                Support extends beyond learning to dignity and care.
              </p>
            </div>

            <!-- Metric 5: 25+ Students Engaged -->
            <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-4xl text-text-dark">25+</span>
              <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-stone-500 mt-2">Students Engaged</h4>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">Through awareness drives</p>
              <p class="font-sans text-[11px] text-stone-400 italic mt-3 font-light leading-relaxed">
                Engagement encourages responsibility and active citizenship.
              </p>
            </div>

          </div>

          <!-- Divider Transition Sentence -->
          <div class="mt-20 text-center scroll-reveal select-none">
            <p class="font-display italic text-base text-stone-500 max-w-lg mx-auto font-light leading-relaxed">
              The numbers show scale. <br class="hidden sm:block" />
              The ripple effect shows how that scale is created.
            </p>
          </div>

        </div>
      </section>
    `;
  }
}
