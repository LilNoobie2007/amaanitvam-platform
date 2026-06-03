import { certificateLogs } from '../../../mocks/certificateLogs.js';

export default class CertificateActivityLog {
  render() {
    const logs = certificateLogs.map(log => {
      let accentColor = 'bg-stone-300';
      if (log.action.includes('Revoked')) accentColor = 'bg-rose-500';
      else if (log.action.includes('Issued')) accentColor = 'bg-emerald-500';
      else if (log.action.includes('Generated')) accentColor = 'bg-amber-500';

      return `
        <div class="flex items-start gap-3 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
          <div class="mt-1.5 shrink-0">
            <div class="w-2 h-2 rounded-full ${accentColor}"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="font-sans text-[14px] font-semibold text-text-dark">${log.action}</span>
              <span class="font-sans text-[12px] text-text-light whitespace-nowrap">${log.timestamp}</span>
            </div>
            <p class="font-sans text-[13px] text-text-muted mb-0.5">
              Cert Number: <code class="font-mono text-[12px] font-semibold text-text-dark">${log.certificateNumber}</code>
            </p>
            <span class="block text-[11px] text-text-light font-interface uppercase tracking-wider">
              Operator: ${log.operator}
            </span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Activity Log (Audit Trail)</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/certificates/logs
          </span>
        </div>

        <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          ${logs.length > 0 ? logs : `<p class="text-center py-6 text-text-light font-sans">No audit records found.</p>`}
        </div>
      </div>
    `;
  }
}
