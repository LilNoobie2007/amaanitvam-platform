import Navbar from '../components/Navbar.js';
import TemplateSelector from '../components/certificates/admin/TemplateSelector.js';
import CertificateGenerator from '../components/certificates/admin/CertificateGenerator.js';
import CertificatePreview from '../components/certificates/admin/CertificatePreview.js';
import Footer from '../components/Footer.js';

export default class CertificateGeneratorPage {
  constructor() {
    this.navbar = new Navbar();
    this.templateSelector = new TemplateSelector();
    this.generator = new CertificateGenerator();
    this.preview = new CertificatePreview();
    this.footer = new Footer();
    
    // Cached template style selection
    this.selectedStyle = 'Warm';
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        <!-- Header -->
        ${this.navbar.render()}

        <main class="flex-grow pt-20 md:pt-24">
          <!-- Page Header -->
          <section class="bg-stone-900 text-white py-12 px-6">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest text-gold-satin mb-2">
                  Console Space
                </span>
                <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">
                  Certificate Generation Desk
                </h1>
              </div>
              <div>
                <a href="#/admin/certificates" class="inline-flex items-center justify-center font-interface font-semibold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-colors">
                  Back to Inventory
                </a>
              </div>
            </div>
          </section>

          <!-- Core Generator Layout -->
          <section class="py-12 px-6 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Left: Controls (Col span 7) -->
              <div class="lg:col-span-7">
                <!-- Select layout template card -->
                ${this.templateSelector.render()}
                
                <!-- Complete configurations parameters form -->
                ${this.generator.render()}
              </div>

              <!-- Right: Live Preview (Col span 5) -->
              <div class="lg:col-span-5">
                ${this.preview.render()}
              </div>

            </div>
          </section>
        </main>

        <!-- Footer -->
        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    // Bind Template Selection
    TemplateSelector.init((temp) => {
      this.selectedStyle = temp.style;
      
      // Force form input refresh to trigger preview redraw with the new design layout style
      const inputEl = document.getElementById('gen-recipient-name');
      if (inputEl) {
        inputEl.dispatchEvent(new Event('input'));
      }
    });

    // Bind live generator inputs to preview updating
    CertificateGenerator.bindPreview((values) => {
      CertificatePreview.update({
        ...values,
        style: this.selectedStyle
      });
    });

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });
    reveals.forEach(el => revealObserver.observe(el));
  }
}
