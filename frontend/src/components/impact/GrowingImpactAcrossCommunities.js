export default class GrowingImpactAcrossCommunities {
  render() {
    return `
      <section id="growing-impact" class="relative py-48 flex items-center justify-center overflow-hidden select-none z-20">
        
        <!-- Background Image with Dark Overlay -->
        <div class="absolute inset-0 z-0">
          <img src="/landscape-child.jpg" alt="Child looking towards landscape sunset" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-stone-950/75 mix-blend-multiply"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div class="flex flex-col items-center scroll-reveal">
            
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-quartz mb-6 block select-none">
              Future Direction
            </span>

            <!-- Large Tagline Overlay (Upped to 48px on desktop) -->
            <h2 class="font-display italic font-light text-3xl lg:text-[48px] text-amber-100/90 tracking-wide leading-tight mb-8">
              "What Are We, If Not for One Another?"
            </h2>

            <div class="w-12 h-px bg-white/20 mb-8"></div>

            <!-- Supporting Paragraph (Upped to 18px+) -->
            <p class="font-sans text-stone-300 font-light text-lg lg:text-[18px] max-w-2xl leading-[1.75]">
              The foundation continues to strengthen opportunities for education, mentorship, awareness, and community engagement across communities. We remain committed to sustainable, student-led action that transforms lives from access to citizenship.
            </p>

          </div>
        </div>

      </section>
    `;
  }
}
