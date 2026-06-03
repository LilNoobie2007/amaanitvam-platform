export default class VerificationResult {
  render() {
    return `
      <div id="verify-result-mount" class="py-16 px-6 bg-white scroll-mt-20">
        <div class="max-w-3xl mx-auto text-center font-sans text-text-light text-[18px]" id="result-status-message">
          Provide verification parameters above to lookup credential status.
        </div>
      </div>
    `;
  }

  static renderResult(cert, searched) {
    const mount = document.getElementById('verify-result-mount');
    if (!mount) return;

    if (!searched) {
      mount.innerHTML = `
        <div class="max-w-3xl mx-auto text-center font-sans text-text-light text-[18px]">
          Provide verification parameters above to lookup credential status.
        </div>
      `;
      return;
    }

    if (!cert) {
      mount.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 border border-rose-200 bg-rose-50/50 rounded-lg text-center scroll-reveal revealed">
          <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h4 class="font-display font-semibold text-[20px] text-rose-950 mb-2">Certificate Not Found</h4>
          <p class="font-sans text-[16px] text-rose-800">
            No certificate record matches the supplied certificate number or verification code. Please audit input spelling.
          </p>
        </div>
      `;
      return;
    }

    // Handle different lifecycle states
    if (cert.status === 'Issued') {
      const verifyUrl = `https://amaanitvam.org/verify?code=${cert.verificationCode}`;
      
      mount.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 border border-emerald-200 bg-emerald-50/40 rounded-lg scroll-reveal revealed">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 class="font-display font-semibold text-[20px] text-emerald-950">Credential Verified</h4>
              <span class="block text-[12px] text-emerald-800 font-interface font-semibold uppercase tracking-wider">Amaanitvam Foundation Official Record</span>
            </div>
            <span class="ml-auto font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
              ${cert.status}
            </span>
          </div>

          <div class="space-y-4 font-sans text-[16px] text-text-muted">
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Recipient Name</span>
              <span class="font-medium text-text-dark font-display text-[18px]">${cert.recipientName}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Credential Type</span>
              <span class="font-medium text-text-dark">${cert.type}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Program / Project</span>
              <span class="font-medium text-text-dark">${cert.program}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Issue Date</span>
              <span class="font-medium text-text-dark">${cert.issueDate}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Certificate ID</span>
              <span class="font-mono text-[14px] text-text-dark font-semibold">${cert.certificateNumber}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Verification Code</span>
              <span class="font-mono text-[14px] text-text-dark font-semibold">${cert.verificationCode}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-text-light text-[14px]">Authorized Signatory</span>
              <span class="font-medium text-text-dark">${cert.issuedBy}</span>
            </div>
          </div>

          <!-- URL / QR Preview block -->
          <div class="mt-8 p-4 bg-stone-50 border border-stone-200 rounded flex items-center justify-between gap-6">
            <div class="flex-1">
              <span class="block text-[10px] uppercase tracking-widest text-text-light mb-1">Verification URL</span>
              <code class="block font-mono text-[12px] text-pink-ruby break-all">${verifyUrl}</code>
            </div>
            <div class="w-16 h-16 bg-white border border-stone-200 flex items-center justify-center shrink-0 rounded shadow-sm select-none" title="Verification QR Placeholder">
              <span class="text-[9px] text-text-light text-center font-interface font-semibold leading-tight uppercase">QR Link</span>
            </div>
          </div>
        </div>
      `;
    } else if (cert.status === 'Revoked') {
      mount.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 border border-rose-250 bg-rose-50/40 rounded-lg scroll-reveal revealed">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
            </div>
            <div>
              <h4 class="font-display font-semibold text-[20px] text-rose-950">Certificate Revoked</h4>
              <span class="block text-[12px] text-rose-800 font-interface font-semibold uppercase tracking-wider">Amaanitvam Foundation Cancelled Record</span>
            </div>
            <span class="ml-auto font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 rounded-full animate-pulse">
              ${cert.status}
            </span>
          </div>

          <div class="space-y-4 font-sans text-[16px] text-text-muted mb-6">
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Recipient Name</span>
              <span class="font-medium text-text-dark font-display text-[18px]">${cert.recipientName}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Certificate ID</span>
              <span class="font-mono text-[14px] text-text-dark">${cert.certificateNumber}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-text-light text-[14px]">Cancellation Reason</span>
              <span class="font-medium text-rose-700 font-semibold">${cert.revocationReason || 'Revoked by administrator.'}</span>
            </div>
          </div>
        </div>
      `;
    } else if (cert.status === 'Draft' || cert.status === 'Generated' || cert.status === 'Pending') {
      mount.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 border border-amber-200 bg-amber-50/40 rounded-lg scroll-reveal revealed">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 class="font-display font-semibold text-[20px] text-amber-950">Issuance Pending</h4>
              <span class="block text-[12px] text-amber-800 font-interface font-semibold uppercase tracking-wider">Amaanitvam Foundation Draft Record</span>
            </div>
            <span class="ml-auto font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full">
              ${cert.status}
            </span>
          </div>

          <p class="font-sans text-[16px] leading-relaxed text-amber-900 text-justify">
            This certificate draft has been generated in our system but has not yet been officially signed or published. The public validation status remains pending.
          </p>
        </div>
      `;
    } else if (cert.status === 'Expired') {
      mount.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 border border-stone-300 bg-stone-100/60 rounded-lg scroll-reveal revealed">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 class="font-display font-semibold text-[20px] text-text-dark">Certificate Expired</h4>
              <span class="block text-[12px] text-text-light font-interface font-semibold uppercase tracking-wider">Amaanitvam Foundation Term Expired</span>
            </div>
            <span class="ml-auto font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-1 bg-stone-200 text-stone-600 border border-stone-300 rounded-full">
              ${cert.status}
            </span>
          </div>

          <div class="space-y-4 font-sans text-[16px] text-text-muted">
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Recipient Name</span>
              <span class="font-medium text-text-dark font-display text-[18px]">${cert.recipientName}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-stone-200/40">
              <span class="text-text-light text-[14px]">Certificate ID</span>
              <span class="font-mono text-[14px] text-text-dark">${cert.certificateNumber}</span>
            </div>
            <p class="text-[14px] leading-relaxed text-text-light py-2">
              This certificate was valid for the duration specified but has reached its official term limit and is now marked as expired in our records.
            </p>
          </div>
        </div>
      `;
    }
  }
}
