export default class CertificatePreview {
  render() {
    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm sticky top-28">
        <h3 class="font-display font-semibold text-[20px] text-text-dark mb-4">
          Live Template Preview
        </h3>
        
        <!-- Render frame wrapper -->
        <div id="certificate-preview-frame" class="w-full transition-all duration-300">
          <!-- Initialized dynamically inside update() -->
        </div>
      </div>
    `;
  }

  static update(values) {
    const frame = document.getElementById('certificate-preview-frame');
    if (!frame) return;

    const {
      recipientName = 'Recipient Name',
      type = 'Volunteer',
      program = 'Project Program Area',
      startDate = '2026-06-01',
      endDate = '2026-08-31',
      issueDate = '2026-09-01',
      description = 'Complete credential description text outlines program contributions.',
      issuedBy = 'Signatory Coordinator',
      certificateNumber = 'AMT-VOL-2026-000',
      verificationCode = 'Q7X9P2LM',
      style = 'Warm'
    } = values;

    const verifyUrl = `https://amaanitvam.org/verify?code=${verificationCode}`;

    let styleClasses = '';
    let layoutHtml = '';

    if (style === 'Warm') {
      // Warm NGO style layout
      styleClasses = 'border-[12px] border-amber-100/60 bg-amber-50/10 p-8 font-sans text-stone-850 text-center';
      layoutHtml = `
        <div class="${styleClasses}">
          <span class="block font-interface font-semibold text-[10px] uppercase tracking-widest text-pink-ruby mb-3">
            Amaanitvam Foundation Service Honor
          </span>
          <h2 class="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mb-4">
            CERTIFICATE OF APPRECIATION
          </h2>
          
          <p class="text-[13px] italic text-text-light mb-1">This credential certifies that</p>
          <h3 class="font-display font-bold text-2xl text-stone-950 border-b border-stone-250 pb-2 mb-4 max-w-sm mx-auto">
            ${recipientName || 'Recipient Name'}
          </h3>
          
          <p class="text-[15px] leading-relaxed text-text-muted max-w-md mx-auto mb-6">
            has dedicated their expertise and care as a volunteer supporting <strong>${program || 'Program'}</strong>. ${description}
          </p>

          <div class="grid grid-cols-2 gap-4 border-t border-stone-200 pt-4 text-[12px] text-text-light mb-6">
            <div class="text-left">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Duration</span>
              <span class="font-medium text-text-dark">${startDate} to ${endDate}</span>
            </div>
            <div class="text-right">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Signed By</span>
              <span class="font-medium text-text-dark">${issuedBy}</span>
            </div>
          </div>

          <!-- URL / QR Area -->
          <div class="border-t border-stone-200/60 pt-4 flex items-center justify-between gap-4">
            <div class="text-left flex-1 min-w-0">
              <span class="block text-[8px] uppercase tracking-widest text-text-light mb-0.5">Verification URL</span>
              <code class="block font-mono text-[10px] text-pink-ruby truncate">${verifyUrl}</code>
            </div>
            <div class="w-12 h-12 bg-white border border-stone-200 rounded flex items-center justify-center shrink-0 shadow-sm text-[8px] text-text-light font-interface uppercase select-none leading-none p-1 text-center">
              QR Link
            </div>
          </div>
        </div>
      `;
    } else if (style === 'Corporate') {
      // Corporate style layout
      styleClasses = 'border-double border-[6px] border-blue-900 bg-stone-50 p-8 font-sans text-stone-800 text-center';
      layoutHtml = `
        <div class="${styleClasses}">
          <span class="block font-interface font-semibold text-[9px] uppercase tracking-widest text-blue-900 mb-3">
            Amaanitvam Foundation Institutional Credential
          </span>
          <h2 class="font-interface font-bold text-2xl text-stone-900 uppercase tracking-widest mb-4">
            Certificate of Internship
          </h2>
          
          <p class="text-[13px] italic text-text-light mb-1">Presented to</p>
          <h3 class="font-display font-semibold text-2xl text-stone-950 border-b border-stone-300 pb-2 mb-4 max-w-sm mx-auto">
            ${recipientName || 'Recipient Name'}
          </h3>
          
          <p class="text-[14px] leading-relaxed text-text-muted max-w-md mx-auto mb-6">
            for successfully completing their term as an intern on the <strong>${program || 'Program'}</strong> initiative, exhibiting professionalism.
          </p>

          <div class="grid grid-cols-2 gap-4 border-t border-stone-200 pt-4 text-[12px] text-text-light mb-6">
            <div class="text-left">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Duration</span>
              <span class="font-medium text-text-dark">${startDate} to ${endDate}</span>
            </div>
            <div class="text-right">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Authorized Signatory</span>
              <span class="font-medium text-text-dark">${issuedBy}</span>
            </div>
          </div>

          <!-- URL / QR Area -->
          <div class="border-t border-stone-250 pt-4 flex items-center justify-between gap-4 font-mono text-[9px] text-text-light">
            <div class="text-left flex-1 min-w-0">
              <span class="block text-[8px] uppercase tracking-widest font-interface text-text-light mb-0.5">Verification URL</span>
              <code class="block text-blue-900 truncate">${verifyUrl}</code>
            </div>
            <div class="w-12 h-12 bg-white border border-blue-900 rounded flex items-center justify-center shrink-0 text-[8px] font-interface uppercase select-none leading-none p-1 text-center">
              QR Link
            </div>
          </div>
        </div>
      `;
    } else if (style === 'Event') {
      // Event style layout
      styleClasses = 'border border-pink-ruby/30 bg-pink-blush/20 p-8 font-sans text-stone-850 text-center rounded-lg';
      layoutHtml = `
        <div class="${styleClasses}">
          <span class="block font-interface font-semibold text-[10px] uppercase tracking-widest text-pink-ruby mb-2">
            Amaanitvam Foundation
          </span>
          <h2 class="font-display font-bold text-3xl text-pink-ruby leading-none mb-4">
            Workshop Participation
          </h2>
          
          <p class="text-[13px] italic text-text-light mb-1">Awarded to</p>
          <h3 class="font-display font-semibold text-2xl text-stone-900 border-b border-pink-ruby/20 pb-2 mb-4 max-w-sm mx-auto">
            ${recipientName || 'Recipient Name'}
          </h3>
          
          <p class="text-[14px] leading-relaxed text-text-muted max-w-md mx-auto mb-6">
            for active attendance, contribution, and completion of the <strong>${program || 'Program'}</strong> workshop drive.
          </p>

          <div class="grid grid-cols-2 gap-4 border-t border-pink-ruby/15 pt-4 text-[12px] text-text-light mb-6">
            <div class="text-left">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Date</span>
              <span class="font-medium text-text-dark">${issueDate}</span>
            </div>
            <div class="text-right">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Signed</span>
              <span class="font-medium text-text-dark">${issuedBy}</span>
            </div>
          </div>

          <!-- URL / QR Area -->
          <div class="border-t border-pink-ruby/15 pt-4 flex items-center justify-between gap-4 font-mono text-[9px]">
            <div class="text-left flex-1 min-w-0">
              <span class="block text-[8px] uppercase tracking-widest font-interface text-text-light mb-0.5">Verification URL</span>
              <code class="block text-pink-ruby truncate">${verifyUrl}</code>
            </div>
            <div class="w-12 h-12 bg-white border border-pink-ruby/30 rounded flex items-center justify-center shrink-0 text-[8px] font-interface uppercase select-none leading-none p-1 text-center">
              QR Link
            </div>
          </div>
        </div>
      `;
    } else {
      // Neutral style layout
      styleClasses = 'border border-stone-300 bg-stone-50/50 p-8 font-sans text-stone-850 text-center';
      layoutHtml = `
        <div class="${styleClasses}">
          <span class="block font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light mb-3">
            Amaanitvam Foundation Credential
          </span>
          <h2 class="font-display font-semibold text-2xl text-text-dark mb-4">
            CERTIFICATE OF COMPLETION
          </h2>
          
          <p class="text-[13px] italic text-text-light mb-1">Presented to</p>
          <h3 class="font-display font-semibold text-xl text-stone-900 border-b border-stone-300 pb-2 mb-4 max-w-sm mx-auto">
            ${recipientName || 'Recipient Name'}
          </h3>
          
          <p class="text-[14px] leading-relaxed text-text-muted max-w-md mx-auto mb-6">
            for successfully satisfying requirements for <strong>${program || 'Program'}</strong>.
          </p>

          <div class="grid grid-cols-2 gap-4 border-t border-stone-200 pt-4 text-[12px] text-text-light mb-6">
            <div class="text-left">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Date</span>
              <span class="font-medium text-text-dark">${issueDate}</span>
            </div>
            <div class="text-right">
              <span class="block text-[9px] uppercase tracking-wider text-text-light">Authorized Sign</span>
              <span class="font-medium text-text-dark">${issuedBy}</span>
            </div>
          </div>

          <!-- URL / QR Area -->
          <div class="border-t border-stone-200 pt-4 flex items-center justify-between gap-4 font-mono text-[9px]">
            <div class="text-left flex-1 min-w-0">
              <span class="block text-[8px] uppercase tracking-widest font-interface text-text-light mb-0.5">Verification URL</span>
              <code class="block text-text-dark truncate">${verifyUrl}</code>
            </div>
            <div class="w-12 h-12 bg-white border border-stone-200 rounded flex items-center justify-center shrink-0 text-[8px] font-interface uppercase select-none leading-none p-1 text-center">
              QR Link
            </div>
          </div>
        </div>
      `;
    }

    frame.innerHTML = layoutHtml;
  }
}
