export default class VerificationForm {
  render() {
    return `
      <section class="py-12 px-6 bg-stone-50 border-b border-stone-250/50">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white border border-stone-200/80 rounded-lg p-6 md:p-8 shadow-sm">
            <h3 class="font-display font-semibold text-[20px] text-text-dark text-center mb-6">
              Search Register Database
            </h3>
            
            <form id="verify-form" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Certificate Number -->
                <div>
                  <label for="search-cert-number" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">
                    Certificate Number
                  </label>
                  <input type="text" id="search-cert-number" class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. AMT-VOL-2026-001">
                </div>

                <!-- Verification Code -->
                <div>
                  <label for="search-verify-code" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">
                    Verification Code
                  </label>
                  <input type="text" id="search-verify-code" class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby transition-colors" placeholder="e.g. 7B92XQK3">
                </div>
              </div>

              <p class="font-sans text-[14px] text-text-light text-center">
                Please enter either the Certificate Number or the Verification Code printed on the certificate document.
              </p>

              <!-- Submit -->
              <div class="text-center pt-2">
                <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center font-interface font-semibold text-[12px] uppercase tracking-widest px-10 py-4 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-all duration-300">
                  Search & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  static init() {
    const form = document.getElementById('verify-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const number = document.getElementById('search-cert-number').value.trim();
      const code = document.getElementById('search-verify-code').value.trim();

      const searchEvent = new CustomEvent('amaanitvam-verify-search', {
        detail: { number, code }
      });
      document.dispatchEvent(searchEvent);
    });
  }
}
