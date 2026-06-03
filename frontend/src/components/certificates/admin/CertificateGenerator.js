import { certificates, certificateCategories } from '../../../mocks/certificates.js';
import { certificateLogs } from '../../../mocks/certificateLogs.js';

export default class CertificateGenerator {
  render() {
    const categoryOptions = certificateCategories.map(cat => `
      <option value="${cat}">${cat}</option>
    `).join('');

    // Pre-calculated dates for helper placeholders
    const todayStr = new Date().toISOString().split('T')[0];

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm mb-6">
        <h3 class="font-display font-semibold text-[20px] text-text-dark mb-6">
          2. Complete Credential Parameters
        </h3>

        <form id="cert-gen-form" class="space-y-6">
          <!-- Recipient Name -->
          <div>
            <label for="gen-recipient-name" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Recipient Name *</label>
            <input type="text" id="gen-recipient-name" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" placeholder="e.g. Priyanshu Sharma">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Certificate Type -->
            <div>
              <label for="gen-cert-type" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Credential Category *</label>
              <select id="gen-cert-type" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby">
                ${categoryOptions}
              </select>
            </div>

            <!-- Program -->
            <div>
              <label for="gen-program" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Program / Initiative *</label>
              <input type="text" id="gen-program" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" placeholder="e.g. Project Manthan Support">
            </div>

            <!-- Start Date -->
            <div>
              <label for="gen-start-date" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Start Date *</label>
              <input type="date" id="gen-start-date" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" value="2026-03-01">
            </div>

            <!-- End Date -->
            <div>
              <label for="gen-end-date" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">End Date *</label>
              <input type="date" id="gen-end-date" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" value="2026-05-31">
            </div>

            <!-- Issue Date -->
            <div>
              <label for="gen-issue-date" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Issue Date *</label>
              <input type="date" id="gen-issue-date" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" value="${todayStr}">
            </div>

            <!-- Issued By -->
            <div>
              <label for="gen-issued-by" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Authorized Signatory *</label>
              <input type="text" id="gen-issued-by" required class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" value="Preeti Goyal (Operations Lead)">
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="gen-description" class="block font-interface font-semibold text-[11px] uppercase tracking-widest text-text-light mb-2">Credential Description *</label>
            <textarea id="gen-description" required rows="3" class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded font-sans text-[16px] text-text-dark focus:outline-none focus:border-pink-ruby" placeholder="Describe the specific actions or learning accomplishments that justify this credential..."></textarea>
          </div>

          <!-- Auto Metadata Display -->
          <div class="p-4 bg-stone-50 border border-stone-200 rounded grid grid-cols-2 gap-4 text-[14px]">
            <div>
              <span class="block text-[10px] uppercase tracking-widest text-text-light">Auto Certificate ID</span>
              <span class="font-mono text-text-dark font-semibold" id="lbl-gen-cert-id">AMT-VOL-2026-000</span>
            </div>
            <div>
              <span class="block text-[10px] uppercase tracking-widest text-text-light">Auto Verification Code</span>
              <span class="font-mono text-text-dark font-semibold" id="lbl-gen-verify-code">Q7X9P2LM</span>
            </div>
          </div>

          <!-- Issue Button -->
          <div class="pt-2">
            <button type="submit" class="w-full inline-flex items-center justify-center font-interface font-semibold text-[12px] uppercase tracking-widest py-4 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-all duration-300">
              Publish & Issue Credential
            </button>
          </div>
        </form>
      </div>
    `;
  }

  static generateMetadata() {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const certId = `AMT-GEN-2026-${randomNum}`;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let verifyCode = '';
    for (let i = 0; i < 8; i++) {
      verifyCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return { certId, verifyCode };
  }

  static bindPreview(onUpdateCallback) {
    const form = document.getElementById('cert-gen-form');
    if (!form) return;

    // Generate and cache mock IDs
    const metadata = CertificateGenerator.generateMetadata();
    const lblId = document.getElementById('lbl-gen-cert-id');
    const lblCode = document.getElementById('lbl-gen-verify-code');

    if (lblId) lblId.textContent = metadata.certId;
    if (lblCode) lblCode.textContent = metadata.verifyCode;

    const getFormValues = () => {
      return {
        recipientName: document.getElementById('gen-recipient-name').value,
        type: document.getElementById('gen-cert-type').value,
        program: document.getElementById('gen-program').value,
        startDate: document.getElementById('gen-start-date').value,
        endDate: document.getElementById('gen-end-date').value,
        issueDate: document.getElementById('gen-issue-date').value,
        description: document.getElementById('gen-description').value,
        issuedBy: document.getElementById('gen-issued-by').value,
        certificateNumber: metadata.certId,
        verificationCode: metadata.verifyCode
      };
    };

    // Listen for inputs and trigger redraw on preview
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (onUpdateCallback) {
          onUpdateCallback(getFormValues());
        }
      });
    });

    // Initial update trigger
    if (onUpdateCallback) {
      onUpdateCallback(getFormValues());
    }

    // Submit handler representing POST /api/certificates
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = getFormValues();
      
      const newRecord = {
        id: `cert-${Date.now()}`,
        ...payload,
        status: 'Issued' // Issue instantly upon submitting
      };
      
      // Simulate database addition by pushing to memory mock array
      certificates.unshift(newRecord);

      // Add to audit trail log
      certificateLogs.unshift({
        id: `log-${Date.now()}`,
        certificateNumber: newRecord.certificateNumber,
        action: "Certificate Issued",
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        operator: "Aman Sharma"
      });

      alert(`Successfully issued credential ${newRecord.certificateNumber} for ${newRecord.recipientName}.\nContract endpoint: POST /api/certificates`);
      window.location.hash = '#/admin/certificates';
    });
  }
}
