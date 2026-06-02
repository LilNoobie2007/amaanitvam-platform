export default class FeaturedStory {
  render() {
    return `
      <section id="featured-story" class="relative py-32 bg-white overflow-hidden z-20 select-none">
        
        <!-- Faint background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl mx-auto mb-20 text-center scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-4 block">Featured Narrative</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Stories From the Field
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <!-- Left: Large Featured Image (6 cols - increased visual weight) -->
            <div class="lg:col-span-6 flex justify-center scroll-reveal">
              <div class="bg-stone-50 p-4 border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden select-none hover:shadow-md transition-shadow duration-500 w-full">
                <img src="/classroom-child.jpg" alt="Child smiling in classroom learning session" class="rounded-xl object-cover aspect-[4/3] w-full hover:scale-101 transition-transform duration-700">
              </div>
            </div>

            <!-- Right: Immersive Story Text (6 cols) -->
            <div class="lg:col-span-6 text-left stagger-container">
              
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby block mb-3 stagger-load">Featured Story</span>
              
              <h3 class="font-display italic text-2xl lg:text-[34px] text-text-dark mb-6 tracking-wide font-medium leading-[1.25] stagger-load">
                A Day With Project Manthan
              </h3>
              
              <p class="font-sans text-[18px] text-text-muted leading-[1.7] font-light mb-8 stagger-load">
                Our educational support starts with access. By establishing consistent learning spaces and regular classes, we watch initial hesitation transform into active engagement.
              </p>
              
              <p class="font-sans text-[16px] text-stone-400 leading-[1.7] font-light italic mb-8 border-l-2 border-pink-ruby/30 pl-4 stagger-load">
                Impact stories and field reports will be published here as the foundation continues documenting its journey.
              </p>

              <div class="stagger-load">
                <a href="#latest-field-updates" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby border-b border-pink-ruby/20 pb-1 hover:border-pink-ruby transition-colors duration-300">
                  Read Field Updates
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>
    `;
  }
}
