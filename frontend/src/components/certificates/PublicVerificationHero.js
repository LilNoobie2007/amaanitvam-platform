export default class PublicVerificationHero {
  render() {
    return `
      <section class="relative bg-stone-900 text-white py-20 px-6 overflow-hidden">
        <!-- Minimal dark gradient overlay -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-stone-950/80"></div>
          <div class="absolute right-0 bottom-0 w-[50%] h-full bg-gradient-to-l from-pink-ruby/10 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto text-center scroll-reveal">
          <span class="inline-block font-interface font-semibold text-[11px] uppercase tracking-widest text-gold-satin mb-4 px-3 py-1 border border-gold-satin/30 rounded-full">
            Credential Registry
          </span>
          <h1 class="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6 text-white">
            Verify Certificate Authenticity
          </h1>
          <p class="font-sans text-[18px] md:text-[20px] leading-[1.7] text-stone-300 max-w-2xl mx-auto">
            Confirm the validity of digital credentials, service honors, and internship certificates issued through Amaanitvam Foundation using a unique verification code or certificate identifier.
          </p>
        </div>
      </section>
    `;
  }
}
