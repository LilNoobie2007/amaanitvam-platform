import { certificates } from '../../../mocks/certificates.js';

export default class VolunteerCertificates {
  render() {
    // Filter certificates specifically for Arjun Mehta to simulate their user scope
    const myCerts = certificates.filter(cert => cert.recipientName === 'Arjun Mehta');

    const cards = myCerts.map(cert => {
      const isIssued = cert.status === 'Issued';
      const statusBadge = isIssued 
        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
        : 'bg-stone-50 text-stone-500 border-stone-200';

      return `
        <div class="p-6 bg-stone-50 border border-stone-200 rounded hover:shadow-sm transition-all duration-300">
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge}">
              ${cert.status}
            </span>
            <span class="font-sans text-[12px] text-text-light">
              Issued: ${cert.issueDate}
            </span>
          </div>

          <h4 class="font-display font-semibold text-[18px] text-text-dark leading-snug mb-3">
            ${cert.type} Certificate - ${cert.program}
          </h4>

          <div class="space-y-2 font-sans text-[14px] text-text-muted mb-6">
            <div class="flex justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light text-[13px]">Certificate ID</span>
              <span class="font-mono text-text-dark font-medium">${cert.certificateNumber}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-stone-200/40">
              <span class="text-text-light text-[13px]">Verification Code</span>
              <span class="font-mono text-text-dark font-medium">${cert.verificationCode}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-text-light text-[13px]">Template Used</span>
              <span class="text-text-dark font-medium">${cert.type} Template</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button class="flex-1 text-center font-interface font-semibold text-[10px] uppercase tracking-widest py-2 rounded border border-pink-ruby text-pink-ruby hover:bg-pink-ruby hover:text-white transition-all duration-300 btn-view-cert-modal" data-cert-number="${cert.certificateNumber}">
              View Layout
            </button>
            <button class="flex-1 text-center font-interface font-semibold text-[10px] uppercase tracking-widest py-2 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 transition-all duration-300 btn-download-cert-mock" data-cert-number="${cert.certificateNumber}">
              Download
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Credentials</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/certificates
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          ${cards.length > 0 ? cards : `
            <p class="text-center py-6 text-text-light font-sans col-span-2 text-[15px]">No active certificates found.</p>
          `}
        </div>

        <!-- Modal Container for live template view -->
        <div id="cert-modal-overlay" class="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
          <div class="bg-white border border-stone-200 rounded-lg max-w-3xl w-full p-8 shadow-2xl relative">
            <button id="btn-close-cert-modal" class="absolute top-4 right-4 text-text-light hover:text-text-dark">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div id="cert-modal-content" class="overflow-y-auto max-h-[80vh]"></div>
          </div>
        </div>
      </div>
    `;
  }

  static init() {
    const viewButtons = document.querySelectorAll('.btn-view-cert-modal');
    const overlay = document.getElementById('cert-modal-overlay');
    const modalContent = document.getElementById('cert-modal-content');
    const closeBtn = document.getElementById('btn-close-cert-modal');
    const downloadButtons = document.querySelectorAll('.btn-download-cert-mock');

    if (downloadButtons) {
      downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const num = e.currentTarget.getAttribute('data-cert-number');
          alert(`Downloading verified credential document: ${num}\nThis maps to backend endpoint: GET /api/certificates/download?number=${num}`);
        });
      });
    }

    if (!viewButtons || !overlay || !modalContent || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });

    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const number = e.currentTarget.getAttribute('data-cert-number');
        const cert = certificates.find(c => c.certificateNumber === number);
        
        if (!cert) return;

        // Render visual templates depending on category style
        let templateHtml = '';
        if (cert.type === 'Volunteer') {
          // Warm NGO style
          templateHtml = `
            <div class="border-[8px] border-amber-100 p-8 text-center bg-amber-50/20 font-sans text-stone-800">
              <span class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-4">Amaanitvam Foundation Service Honor</span>
              <h2 class="font-display font-bold text-3xl text-stone-900 mb-6">CERTIFICATE OF APPRECIATION</h2>
              <p class="text-[15px] italic text-text-light mb-1">This credential certifies that</p>
              <h3 class="font-display font-semibold text-2xl text-stone-900 border-b border-stone-200 pb-2 mb-6 max-w-md mx-auto">${cert.recipientName}</h3>
              <p class="text-[16px] leading-[1.7] max-w-xl mx-auto mb-8">
                has selflessly dedicated their skills and care as a volunteer supporting <strong>${cert.program}</strong>. ${cert.description}
              </p>
              <div class="grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 text-[13px] text-text-light">
                <div class="text-left">
                  <span class="block font-interface text-[10px] uppercase tracking-wider text-text-light mb-1">Duration</span>
                  <span class="font-medium text-text-dark">${cert.startDate} to ${cert.endDate}</span>
                </div>
                <div class="text-right">
                  <span class="block font-interface text-[10px] uppercase tracking-wider text-text-light mb-1">Signed By</span>
                  <span class="font-medium text-text-dark">${cert.issuedBy}</span>
                </div>
              </div>
              <div class="mt-8 pt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-text-light font-mono">
                <span>Code: ${cert.verificationCode}</span>
                <span>ID: ${cert.certificateNumber}</span>
              </div>
            </div>
          `;
        } else {
          // Fallback simple layout
          templateHtml = `
            <div class="border-4 border-stone-200 p-8 text-center bg-stone-50 font-sans text-stone-800">
              <span class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-500 mb-4">Amaanitvam Foundation</span>
              <h2 class="font-display font-semibold text-2xl text-stone-900 mb-6">CERTIFICATE OF COMPLETION</h2>
              <p class="text-[15px] italic text-text-light mb-1">Presented to</p>
              <h3 class="font-display font-semibold text-xl text-stone-900 border-b border-stone-200 pb-2 mb-6 max-w-md mx-auto">${cert.recipientName}</h3>
              <p class="text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
                for successful engagement in the <strong>${cert.program}</strong> program.
              </p>
              <div class="grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 text-[13px] text-text-light">
                <div class="text-left">
                  <span>Date Issued: ${cert.issueDate}</span>
                </div>
                <div class="text-right">
                  <span>Signatory: ${cert.issuedBy}</span>
                </div>
              </div>
              <div class="mt-8 pt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-mono">
                <span>Code: ${cert.verificationCode}</span>
                <span>ID: ${cert.certificateNumber}</span>
              </div>
            </div>
          `;
        }

        modalContent.innerHTML = templateHtml;
        overlay.classList.remove('hidden');
      });
    });
  }
}
