export default class Transparency {
  render() {
    return `
      <section id="transparency" class="relative py-32 bg-white overflow-hidden z-20 select-none">
        
        <!-- Faint vertical line background thread -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl mx-auto mb-20 text-center scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Accountability</span>
            <h2 class="font-display font-semibold text-3xl lg:text-[42px] text-text-dark mt-2 tracking-tight leading-snug">
              Transparency & Accountability
            </h2>
            <p class="font-sans text-lg lg:text-[20px] text-text-muted mt-4 leading-[1.7] font-light">
              We hold our work to institutional standards of reporting. Transparency is not an afterthought, but a core component of our service.
            </p>
          </div>

          <!-- 3-Column Concrete Proof Structure Grid (Upped typography to 16px+) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start justify-center max-w-5xl mx-auto stagger-container select-none text-left">
            
            <!-- Column 1: What We Measure -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl min-h-[400px] flex flex-col justify-between stagger-load hover:shadow-sm transition-shadow duration-300">
              <div>
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-6">What We Measure</h4>
                <ul class="space-y-4 font-sans text-[16px] text-text-muted font-light leading-[1.7]">
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Student Participation</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Learning Engagement</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Community Outreach Reach</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Activity Records</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Volunteer Involvement</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 2: How We Measure -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl min-h-[400px] flex flex-col justify-between stagger-load hover:shadow-sm transition-shadow duration-300">
              <div>
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-6">How We Measure</h4>
                <ul class="space-y-4 font-sans text-[16px] text-text-muted font-light leading-[1.7]">
                  <li class="flex items-center gap-3">
                    <span class="text-amber-500 text-[11px]">▪</span>
                    <span>Program Participation Logs</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-amber-500 text-[11px]">▪</span>
                    <span>Mentorship Reviews</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-amber-500 text-[11px]">▪</span>
                    <span>Outreach Verification</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-amber-500 text-[11px]">▪</span>
                    <span>Activity Performance Tracking</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-amber-500 text-[11px]">▪</span>
                    <span>Continuous Local Evaluation</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 3: Our Commitment -->
            <div class="bg-stone-50/50 p-8 border border-stone-200/50 rounded-2xl min-h-[400px] flex flex-col justify-between stagger-load hover:shadow-sm transition-shadow duration-300">
              <div>
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-6">Our Commitment</h4>
                <ul class="space-y-4 font-sans text-[16px] text-text-muted font-light leading-[1.7]">
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Responsible Stewardship</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Verified Metrics Reporting</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Community-Focused Action</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Long-Term Change focus</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="text-pink-ruby text-[11px]">▪</span>
                    <span>Continuous Improvement cycles</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
