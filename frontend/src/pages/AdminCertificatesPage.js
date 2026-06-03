import Navbar from '../components/Navbar.js';
import CertificateOverview from '../components/certificates/admin/CertificateOverview.js';
import CertificateTable from '../components/certificates/admin/CertificateTable.js';
import CertificateActivityLog from '../components/certificates/admin/CertificateActivityLog.js';
import Footer from '../components/Footer.js';

export default class AdminCertificatesPage {
  constructor() {
    this.navbar = new Navbar();
    this.overview = new CertificateOverview();
    this.table = new CertificateTable();
    this.activityLog = new CertificateActivityLog();
    this.footer = new Footer();
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
                  Credential Registry Manager
                </h1>
              </div>
              <div>
                <a href="#/admin/certificates/new" class="inline-flex items-center justify-center font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow-sm transition-all duration-300">
                  Issue New Certificate
                </a>
              </div>
            </div>
          </section>

          <!-- Overview statistics Row -->
          <section class="py-8 px-6 max-w-7xl mx-auto">
            ${this.overview.render()}
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-reveal">
              <!-- Left: Table (Col span 8) -->
              <div class="lg:col-span-8">
                ${this.table.render()}
              </div>

              <!-- Right: Activity Log (Col span 4) -->
              <div class="lg:col-span-4">
                ${this.activityLog.render()}
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
    CertificateTable.init();
    Footer.init();

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
