export default class VolunteerCTA {
  render() {
    return `
      <section class="py-24 px-6 bg-white text-text-dark scroll-mt-20" id="volunteer-apply-form">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-2 block">
              Begin Your Application
            </span>
            <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-[42px] leading-[1.2] mb-4 text-text-dark">
              Apply to the Ecosystem
            </h2>
            <p class="font-sans text-[18px] leading-[1.7] text-text-muted">
              Fill out the form below. Once submitted, our team will review your profile and match you with open projects.
            </p>
          </div>

          <div class="bg-stone-50 border border-stone-200/60 rounded-lg p-8 md:p-12 shadow-sm scroll-reveal">
            <form id="apply-form" class="space-y-6">
              
              <!-- Success Banner -->
              <div id="form-success-banner" class="hidden p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded mb-6">
                <h4 class="font-display font-semibold text-[18px] mb-2">Application Submitted Successfully!</h4>
                <p class="font-sans text-[15px] leading-relaxed">
                  Thank you for applying to Amaanitvam. We have recorded your parameters under the mock contract 'POST /api/volunteer/apply'. Our leadership team will review it and get back to you shortly.
                </p>
              </div>

              <!-- Two Column Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Name -->
                <div>
                  <label for="form-name" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Full Name *</label>
                  <input type="text" id="form-name" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. Priyanshu Sharma">
                </div>

                <!-- Email -->
                <div>
                  <label for="form-email" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Email Address *</label>
                  <input type="email" id="form-email" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. name@domain.com">
                </div>

                <!-- Phone -->
                <div>
                  <label for="form-phone" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Phone Number *</label>
                  <input type="tel" id="form-phone" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. +91 98765 43210">
                </div>

                <!-- Location -->
                <div>
                  <label for="form-location" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Current Location *</label>
                  <input type="text" id="form-location" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. South Delhi, India">
                </div>

                <!-- Availability -->
                <div>
                  <label for="form-availability" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Availability *</label>
                  <select id="form-availability" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors">
                    <option value="" disabled selected>Select schedule</option>
                    <option value="Weekends Only">Weekends Only</option>
                    <option value="Weekdays Only">Weekdays Only</option>
                    <option value="Flexible (Both)">Flexible (Both)</option>
                    <option value="Short-term intensive">Short-term intensive</option>
                  </select>
                </div>

                <!-- Preferred Domain -->
                <div>
                  <label for="form-domain" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Preferred Domain *</label>
                  <select id="form-domain" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors">
                    <option value="" disabled selected>Select project area</option>
                    <option value="Education & Mentorship">Education & Mentorship (Manthan)</option>
                    <option value="Technology">Technology & Computers (Shiksha)</option>
                    <option value="Community Outreach">Community Outreach (Pravah)</option>
                    <option value="Communications & Content">Communications & Design</option>
                  </select>
                </div>

              </div>

              <!-- Skills -->
              <div>
                <label for="form-skills" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Skills & Expertise *</label>
                <input type="text" id="form-skills" required class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. Teaching, Coding (JS), Graphic Design, Event Coordination">
              </div>

              <!-- Message -->
              <div>
                <label for="form-message" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Why do you want to join Amaanitvam? *</label>
                <textarea id="form-message" required rows="4" class="w-full px-4 py-3 bg-white border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="Tell us briefly about your motivation..."></textarea>
              </div>

              <!-- Submit -->
              <div class="pt-4">
                <button type="submit" id="btn-submit-app" class="w-full inline-flex items-center justify-center font-interface font-semibold text-[12px] uppercase tracking-widest py-4 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-all duration-300">
                  Submit Application
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    `;
  }

  static init() {
    const form = document.getElementById('apply-form');
    const banner = document.getElementById('form-success-banner');
    
    if (!form || !banner) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const payload = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        location: document.getElementById('form-location').value,
        availability: document.getElementById('form-availability').value,
        domain: document.getElementById('form-domain').value,
        skills: document.getElementById('form-skills').value.split(',').map(s => s.trim()),
        message: document.getElementById('form-message').value,
        appliedDate: new Date().toISOString().split('T')[0]
      };

      // Output contract-ready payload to console.log representing POST request
      console.log("POST /api/volunteer/apply (Payload Contract Schema):", payload);

      // Save application locally in sessionStorage to display in dashboard
      try {
        const storedApps = JSON.parse(sessionStorage.getItem('amaanitvam_my_applications') || '[]');
        storedApps.push({
          id: `app-${Date.now()}`,
          opportunityId: `opp-${payload.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          title: payload.domain,
          appliedDate: payload.appliedDate,
          status: "Applied"
        });
        sessionStorage.setItem('amaanitvam_my_applications', JSON.stringify(storedApps));
      } catch (err) {
        console.error("Failed to cache application in sessionStorage", err);
      }

      // Show success banner and reset form
      banner.classList.remove('hidden');
      form.reset();
      
      // Auto scroll back to top of form to see banner
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}
