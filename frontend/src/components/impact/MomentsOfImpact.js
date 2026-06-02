export default class MomentsOfImpact {
  render() {
    return `
      <section id="moments-of-impact" class="relative py-32 bg-white overflow-hidden z-20 select-none">
        
        <!-- Faint background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          <div class="max-w-2xl mx-auto mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Milestones</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Moments of Impact
            </h2>
            <p class="font-sans text-lg lg:text-[20px] text-text-muted mt-4 leading-[1.7] font-light">
              Tracking our progress along our timeline of change.
            </p>
          </div>

          <!-- Horizontal Timeline Grid (Upped typography) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative stagger-container select-none max-w-5xl mx-auto">
            
            <!-- Connection Line (Desktop only, adjusted top alignment) -->
            <div class="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-0.5 bg-stone-200 pointer-events-none z-0"></div>

            <!-- Milestone 1 -->
            <div class="flex flex-col items-center stagger-load z-10 relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 hover:scale-105 transition-transform duration-300">
                <img src="/classroom-child.jpg" alt="Learning Sessions" class="w-full h-full object-cover">
              </div>
              <span class="w-3 h-3 rounded-full bg-pink-ruby mb-4 select-none"></span>
              <h4 class="font-interface font-bold text-[16px] uppercase tracking-widest text-text-dark mb-2">Learning Sessions</h4>
              <p class="font-sans text-[16px] text-text-muted max-w-[200px] leading-[1.7] font-light">
                Providing structured active classes and initial support.
              </p>
            </div>

            <!-- Milestone 2 -->
            <div class="flex flex-col items-center stagger-load z-10 relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 hover:scale-105 transition-transform duration-300">
                <img src="/landscape-child.jpg" alt="Student Engagement" class="w-full h-full object-cover">
              </div>
              <span class="w-3 h-3 rounded-full bg-amber-500 mb-4 select-none"></span>
              <h4 class="font-interface font-bold text-[16px] uppercase tracking-widest text-text-dark mb-2">Student Engagement</h4>
              <p class="font-sans text-[16px] text-text-muted max-w-[200px] leading-[1.7] font-light">
                Nurturing academic curiosity and intellectual growth.
              </p>
            </div>

            <!-- Milestone 3 -->
            <div class="flex flex-col items-center stagger-load z-10 relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 hover:scale-105 transition-transform duration-300">
                <img src="/field-children.jpg" alt="Community Participation" class="w-full h-full object-cover">
              </div>
              <span class="w-3 h-3 rounded-full bg-pink-ruby mb-4 select-none"></span>
              <h4 class="font-interface font-bold text-[16px] uppercase tracking-widest text-text-dark mb-2">Participation</h4>
              <p class="font-sans text-[16px] text-text-muted max-w-[200px] leading-[1.7] font-light">
                Empowering children to lead social awareness campaigns.
              </p>
            </div>

            <!-- Milestone 4 -->
            <div class="flex flex-col items-center stagger-load z-10 relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 hover:scale-105 transition-transform duration-300">
                <img src="/landscape-child.jpg" alt="Growing Reach" class="w-full h-full object-cover">
              </div>
              <span class="w-3 h-3 rounded-full bg-amber-500 mb-4 select-none"></span>
              <h4 class="font-interface font-bold text-[16px] uppercase tracking-widest text-text-dark mb-2">Growing Reach</h4>
              <p class="font-sans text-[16px] text-text-muted max-w-[200px] leading-[1.7] font-light">
                Fostering civic responsibility across communities.
              </p>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
