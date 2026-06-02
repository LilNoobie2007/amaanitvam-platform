export default class ImpactHero {
  render() {
    return `
      <section id="impact-hero" class="relative min-h-[75vh] flex items-center justify-center overflow-hidden select-none z-10">
        
        <!-- Full Bleed Background Image with Dark Overlay -->
        <div class="absolute inset-0 z-0">
          <img src="/field-children.jpg" alt="Children looking out at sunset field" class="w-full h-full object-cover animate-breath">
          <div class="absolute inset-0 bg-stone-950/75 mix-blend-multiply"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
        </div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10 pt-24 pb-20">
          <div class="flex flex-col items-center stagger-container">
            
            <!-- Tagline Badge -->
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-quartz mb-6 block select-none stagger-load">
              Our Progress
            </span>

            <!-- Main Headline (Optimized for Editorial Scale) -->
            <h1 class="font-display font-medium text-4xl sm:text-5xl lg:text-[64px] text-white tracking-tight leading-[1.15] mb-8 stagger-load">
              Every Number Represents a Human Story
            </h1>

            <div class="w-12 h-px bg-white/20 mb-8 stagger-load"></div>

            <!-- Legible Subtitle (Upped to 20px on desktop) -->
            <p class="font-sans text-stone-300 font-light text-lg lg:text-[20px] max-w-2xl leading-[1.75] stagger-load">
              Behind every learning session, outreach initiative, and community activity are individuals whose lives have been touched through collective action.
            </p>

          </div>
        </div>

      </section>
    `;
  }
}
