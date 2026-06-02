export default class GetInvolved {
  render() {
    return `
      <section id="get-involved-cta" class="relative py-32 bg-white overflow-hidden z-20 select-none">
        
        <!-- Faint vertical line background thread -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          <div class="max-w-2xl mx-auto mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Become Part of the Story</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Join Our Mission
            </h2>
            <p class="font-sans text-lg lg:text-[20px] text-text-muted mt-4 leading-[1.7] font-light">
              Every contribution, whether through time, skills, partnerships, or support, helps create opportunities for learning, growth, and community development.
            </p>
          </div>

          <!-- Three Equal Cards Grid (Upped typography) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-container select-none text-left">
            
            <!-- Volunteer Card -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[340px] stagger-load">
              <div>
                <div class="text-pink-ruby text-2xl mb-4">
                  <!-- Hands Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>
                </div>
                <h3 class="font-display italic text-2xl text-text-dark font-medium leading-snug mb-3">Volunteer</h3>
                <p class="font-sans text-[18px] text-text-muted font-light leading-[1.7]">
                  Contribute your time and skills to support active classes, mentorship networks, and field programs directly on the ground.
                </p>
              </div>
              <div class="mt-8">
                <a href="#volunteer-form" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-md bg-gold-satin text-white hover:bg-gold-satin/95 shadow-sm transition-all duration-300">
                  Get Involved
                </a>
              </div>
            </div>

            <!-- Donate Card -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[340px] stagger-load">
              <div>
                <div class="text-amber-500 text-2xl mb-4">
                  <!-- Heart Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <h3 class="font-display italic text-2xl text-text-dark font-medium leading-snug mb-3">Donate</h3>
                <p class="font-sans text-[18px] text-text-muted font-light leading-[1.7]">
                  Provide educational resources, support logistics, and enable sustained, inclusive opportunities for underprivileged children.
                </p>
              </div>
              <div class="mt-8">
                <a href="https://www.amaanitvam.org/donate/" target="_blank" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-md bg-gold-satin text-white hover:bg-gold-satin/95 shadow-sm transition-all duration-300">
                  Donate Now
                </a>
              </div>
            </div>

            <!-- Partner Card -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 min-h-[340px] stagger-load">
              <div>
                <div class="text-pink-ruby text-2xl mb-4">
                  <!-- Briefcase/Partner Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 class="font-display italic text-2xl text-text-dark font-medium leading-snug mb-3">Partner</h3>
                <p class="font-sans text-[18px] text-text-muted font-light leading-[1.7]">
                  Collaborate to expand impact. Schools, institutions, and community groups are welcome to partner on programmatic development.
                </p>
              </div>
              <div class="mt-8">
                <a href="mailto:amaanitvamfoundation@gmail.com" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-md border border-stone-200 text-stone-600 bg-white hover:border-pink-ruby hover:text-pink-ruby transition-all duration-300">
                  Collaborate
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
