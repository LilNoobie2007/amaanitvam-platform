import { certificateStats } from '../../../mocks/certificateStats.js';

export default class CertificateOverview {
  render() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        
        <!-- Summary Cards (Col span 8) -->
        <div class="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <!-- Total Issued -->
          <div class="bg-white border border-stone-200/80 rounded p-6 shadow-sm text-center">
            <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Total Issued</span>
            <span class="font-display font-bold text-3xl text-text-dark">${certificateStats.totalIssued}</span>
          </div>

          <!-- Active -->
          <div class="bg-white border border-stone-200/80 rounded p-6 shadow-sm text-center">
            <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Active</span>
            <span class="font-display font-bold text-3xl text-emerald-700">${certificateStats.active}</span>
          </div>

          <!-- Revoked -->
          <div class="bg-white border border-stone-200/80 rounded p-6 shadow-sm text-center">
            <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Revoked</span>
            <span class="font-display font-bold text-3xl text-rose-700">${certificateStats.revoked}</span>
          </div>

          <!-- Pending -->
          <div class="bg-white border border-stone-200/80 rounded p-6 shadow-sm text-center">
            <span class="block text-[11px] uppercase tracking-widest text-text-light mb-1">Pending</span>
            <span class="font-display font-bold text-3xl text-amber-700">${certificateStats.pending}</span>
          </div>
        </div>

        <!-- Bulk Issuance Placeholder (Col span 4) -->
        <div class="md:col-span-4 bg-stone-50 border border-stone-200/80 rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <h4 class="font-display font-semibold text-[16px] text-text-dark">Bulk CSV Issuance</h4>
              <span class="font-interface font-semibold text-[8px] uppercase tracking-wider px-2 py-0.5 border border-pink-medium/30 bg-pink-blush text-pink-ruby rounded">
                Coming Soon
              </span>
            </div>
            <p class="font-sans text-[13px] leading-relaxed text-text-muted">
              Batch generation workflow: upload a recipient CSV schema (Name, Email, Dates, Program) to auto-generate and dispatch 100+ credentials.
            </p>
          </div>
          <button disabled class="mt-4 w-full py-2 bg-stone-200 text-stone-400 font-interface font-semibold text-[10px] uppercase tracking-widest rounded border border-stone-300 cursor-not-allowed">
            Upload CSV File
          </button>
        </div>

      </div>
    `;
  }
}
