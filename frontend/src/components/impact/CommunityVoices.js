export default class CommunityVoices {
  render() {
    return `
      <section id="community-voices" class="relative py-32 bg-stone-50/50 overflow-hidden border-t border-b border-stone-200/20 z-20 select-none">
        
        <!-- Faint vertical line background thread -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          <div class="max-w-2xl mx-auto mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Reflections</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Community Voices
            </h2>
            <p class="font-sans text-lg lg:text-[20px] text-text-muted mt-4 leading-[1.7] font-light">
              As the foundation continues documenting its journey, reflections from learners, volunteers and community members will be shared here.
            </p>
          </div>

          <!-- Testimonial Placeholders Grid (Upped typography) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-container max-w-5xl mx-auto select-none text-left">
            
            <!-- Learner Story -->
            <div class="bg-white p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[300px] stagger-load">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-pink-ruby tracking-widest block mb-4">Learner Story</span>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7] italic">
                  Reflections from children supported through our active learning sessions and mentorship.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-stone-100 font-interface text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Coming Soon
              </div>
            </div>

            <!-- Volunteer Reflection -->
            <div class="bg-white p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[300px] stagger-load">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-amber-600 tracking-widest block mb-4">Volunteer Reflection</span>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7] italic">
                  Experiences from our active student mentors coordinating field campaigns.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-stone-100 font-interface text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Coming Soon
              </div>
            </div>

            <!-- Community Perspective -->
            <div class="bg-white p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[300px] stagger-load">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-pink-ruby tracking-widest block mb-4">Community Perspective</span>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7] italic">
                  Outlooks and comments from local families collaborating on regional development.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-stone-100 font-interface text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Coming Soon
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
