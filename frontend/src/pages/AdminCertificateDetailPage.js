import Navbar from '../components/Navbar.js';
import CertificatePreview from '../components/certificates/admin/CertificatePreview.js';
import Footer from '../components/Footer.js';
import { certificates } from '../mocks/certificates.js';

export default class AdminCertificateDetailPage {
  constructor() {
    this.navbar = new Navbar();
    this.preview = new CertificatePreview();
    this.footer = new Footer();
  }

  render() {
    // Parse query ID from hash string e.g. #/admin/certificates/view?id=1
    const hash = window.location.hash;
    const searchPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const urlParams = new URLSearchParams(searchPart);
    const id = urlParams.get('id');

    // Find record
    const cert = certificates.find(c => c.id === id || String(c.id) === String(id));

    if (!cert) {
      return `
        <div class="flex flex-col min-h-screen bg-stone-50 select-none">
          ${this.navbar.render()}
          <main class="flex-grow pt-32 text-center py-20">
            <h2 class="font-display font-semibold text-2xl text-stone-900 mb-2">Record Not Found</h2>
            <p class="font-sans text-text-muted mb-6">The requested credential id does not match any items in inventory.</p>
            <a href="#/admin/certificates" class="font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Return to Inventory
            </a>
          </main>
          ${this.footer.render()}
        </div>
      `;
    }

    let statusBadge = 'bg-stone-50 text-stone-600 border-stone-200';
    if (cert.status === 'Issued') statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    else if (cert.status === 'Revoked') statusBadge = 'bg-rose-50 text-rose-800 border-rose-200';
    else if (cert.status === 'Draft' || cert.status === 'Generated') statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
    else if (cert.status === 'Expired') statusBadge = 'bg-stone-250 text-stone-700 border-stone-300';

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
                  Credential Audit Details
                </h1>
              </div>
              <div>
                <a href="#/admin/certificates" class="inline-flex items-center justify-center font-interface font-semibold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-colors">
                  Return to Inventory
                </a>
              </div>
            </div>
          </section>

          <!-- Main details grid -->
          <section class="py-12 px-6 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Column 1: Details (col span 7) -->
              <div class="lg:col-span-7 bg-white border border-stone-200/60 rounded-lg p-8 shadow-sm">
                <div class="flex items-center justify-between gap-3 pb-4 border-b border-stone-100 mb-6">
                  <h3 class="font-display font-semibold text-[22px] text-text-dark">Metadata Inspection</h3>
                  <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge}">
                    ${cert.status}
                  </span>
                </div>

                <div class="space-y-4 font-sans text-[16px] text-text-muted">
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Recipient Name</span>
                    <span class="sm:col-span-2 font-medium text-text-dark font-display text-[18px]">${cert.recipientName}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Credential Type</span>
                    <span class="sm:col-span-2 font-medium text-text-dark">${cert.type}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Program / Initiative</span>
                    <span class="sm:col-span-2 font-medium text-text-dark">${cert.program}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Duration Term</span>
                    <span class="sm:col-span-2 font-medium text-text-dark">${cert.startDate || 'N/A'} to ${cert.endDate || 'N/A'}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Certificate ID</span>
                    <span class="sm:col-span-2 font-mono text-[14px] text-text-dark font-semibold">${cert.certificateNumber}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Verification Code</span>
                    <span class="sm:col-span-2 font-mono text-[14px] text-text-dark font-semibold">${cert.verificationCode}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Authorized Signatory</span>
                    <span class="sm:col-span-2 font-medium text-text-dark">${cert.issuedBy}</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 py-2 border-b border-stone-200/40">
                    <span class="text-text-light text-[14px]">Description text</span>
                    <span class="sm:col-span-2 font-medium text-text-dark text-justify leading-relaxed text-[15px]">${cert.description}</span>
                  </div>
                  
                  ${cert.status === 'Revoked' ? `
                    <div class="grid grid-cols-1 sm:grid-cols-3 py-2 text-rose-700 bg-rose-50/50 p-4 border border-rose-200 rounded">
                      <span class="text-[14px] font-semibold">Revocation Reason</span>
                      <span class="sm:col-span-2 font-medium text-[15px]">${cert.revocationReason || 'Cancelled by operator.'}</span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Column 2: Layout render (col span 5) -->
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

    // Parse query ID from hash string
    const hash = window.location.hash;
    const searchPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const urlParams = new URLSearchParams(searchPart);
    const id = urlParams.get('id');

    const cert = certificates.find(c => c.id === id || String(c.id) === String(id));

    if (cert) {
      // Find template style
      let tempStyle = 'Neutral';
      if (cert.type === 'Volunteer') tempStyle = 'Warm';
      else if (cert.type === 'Internship') tempStyle = 'Corporate';
      else if (cert.type === 'Workshop' || cert.type === 'Event Participation') tempStyle = 'Event';

      // Load static certificate template preview values
      CertificatePreview.update({
        recipientName: cert.recipientName,
        type: cert.type,
        program: cert.program,
        startDate: cert.startDate,
        endDate: cert.endDate,
        issueDate: cert.issueDate,
        description: cert.description,
        issuedBy: cert.issuedBy,
        certificateNumber: cert.certificateNumber,
        verificationCode: cert.verificationCode,
        style: tempStyle
      });
    }

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
