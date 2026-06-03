import { certificates } from '../../../mocks/certificates.js';

export default class Certificates {
  render() {
    const certItems = certificates.map(cert => {
      const isIssued = cert.status === 'Issued';
      const statusBadge = isIssued 
        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
        : 'bg-stone-50 text-stone-500 border-stone-200';

      const downloadAction = isIssued
        ? `<button class="inline-flex items-center gap-1.5 font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-pink-ruby text-pink-ruby hover:bg-pink-ruby hover:text-white transition-all duration-300 btn-download-cert" data-verification-id="${cert.verificationId}">
             Download PDF
           </button>`
        : `<span class="font-interface text-[11px] text-text-light italic">Processing</span>`;

      return `
        <div class="p-6 border border-stone-200/60 rounded hover:bg-stone-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2.5 mb-2">
              <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-0.5 border rounded-full ${statusBadge}">
                ${cert.status}
              </span>
              <span class="font-mono text-[12px] text-text-light font-medium tracking-wide">
                ID: ${cert.verificationId}
              </span>
            </div>
            
            <h4 class="font-display font-semibold text-[18px] text-text-dark leading-snug">
              ${cert.certificateName}
            </h4>
            
            <span class="block text-[13px] text-text-light font-sans mt-1">
              Issued on: ${cert.issueDate}
            </span>
          </div>

          <div class="shrink-0 text-left sm:text-right">
            ${downloadAction}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Verified Credentials</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/certificates
          </span>
        </div>

        <div class="space-y-4">
          ${certItems}
        </div>
      </div>
    `;
  }

  static init() {
    const buttons = document.querySelectorAll('.btn-download-cert');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-verification-id');
        alert(`Downloading verified credentials for Certificate ID: ${id}\nThis matches compatibility schema: GET /api/certificates/download?id=${id}`);
      });
    });
  }
}
