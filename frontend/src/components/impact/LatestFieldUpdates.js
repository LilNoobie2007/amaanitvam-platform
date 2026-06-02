export default class LatestFieldUpdates {
  render() {
    return `
      <section id="latest-field-updates" class="relative py-32 bg-white overflow-hidden z-20 select-none">
        
        <!-- Faint vertical line background thread -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl mx-auto mb-20 text-center scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Field Updates</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Latest Field Reports
            </h2>
            <p class="font-sans text-lg lg:text-[20px] text-text-muted mt-4 leading-[1.7] font-light">
              We document our milestones directly from active programs on the ground.
            </p>
          </div>

          <!-- Flexible Layout Grid for future updates (identical heights for drop-in support, upped font sizes) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-container select-none">
            
            <!-- Card 1 -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/60 rounded-2xl flex flex-col justify-between stagger-load min-h-[340px] hover:shadow-sm transition-shadow duration-300">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-pink-ruby tracking-widest block mb-4">Academic growth</span>
                <h3 class="font-display italic text-[24px] text-text-dark font-medium leading-snug mb-3">Learning Beyond The Classroom</h3>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7]">
                  Exploring expanding opportunities and student learning milestones.
                </p>
              </div>
              <div class="mt-8 pt-4 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-interface uppercase font-semibold text-stone-400">
                <span>Coming Soon</span>
                <span>•</span>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/60 rounded-2xl flex flex-col justify-between stagger-load min-h-[340px] hover:shadow-sm transition-shadow duration-300">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-amber-600 tracking-widest block mb-4">Social campaigns</span>
                <h3 class="font-display italic text-[24px] text-text-dark font-medium leading-snug mb-3">Community Outreach In Action</h3>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7]">
                  Field reports covering social drives and community outreach initiatives.
                </p>
              </div>
              <div class="mt-8 pt-4 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-interface uppercase font-semibold text-stone-400">
                <span>Coming Soon</span>
                <span>•</span>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/60 rounded-2xl flex flex-col justify-between stagger-load min-h-[340px] hover:shadow-sm transition-shadow duration-300">
              <div>
                <span class="font-interface text-[9px] uppercase font-bold text-pink-ruby tracking-widest block mb-4">Volunteer network</span>
                <h3 class="font-display italic text-[24px] text-text-dark font-medium leading-snug mb-3">Volunteer Reflections</h3>
                <p class="font-sans text-[18px] text-stone-400 font-light leading-[1.7]">
                  Personal reports from student mentors and community coordinators.
                </p>
              </div>
              <div class="mt-8 pt-4 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-interface uppercase font-semibold text-stone-400">
                <span>Coming Soon</span>
                <span>•</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
