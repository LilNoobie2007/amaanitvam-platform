import { certificates } from '../../../mocks/certificates.js';
import { certificateLogs } from '../../../mocks/certificateLogs.js';

export default class CertificateTable {
  render() {
    // Collect unique types for filtering dropdown
    const types = ['All Types', 'Volunteer', 'Internship', 'Workshop', 'Custom'];
    const typeOptions = types.map(t => `<option value="${t}">${t}</option>`).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm mb-8">
        
        <!-- Filters Row -->
        <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6 pb-6 border-b border-stone-100">
          <div class="flex-1">
            <label for="search-admin-certs" class="block font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light mb-1.5">Search Inventory</label>
            <input type="text" id="search-admin-certs" class="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded font-sans text-[15px] text-text-dark focus:outline-none focus:border-pink-ruby" placeholder="Search by recipient name, number, or code...">
          </div>
          <div class="w-full md:w-48">
            <label for="filter-admin-type" class="block font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light mb-1.5">Category Filter</label>
            <select id="filter-admin-type" class="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded font-sans text-[15px] text-text-dark focus:outline-none focus:border-pink-ruby">
              ${typeOptions}
            </select>
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="admin-certs-table-el">
            <thead>
              <tr class="border-b border-stone-200 text-[11px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-3 pr-4">Recipient Name</th>
                <th class="pb-3 px-4">Credential ID & Code</th>
                <th class="pb-3 px-4">Type & Program</th>
                <th class="pb-3 px-4">Issue Date</th>
                <th class="pb-3 px-4">Status</th>
                <th class="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100" id="admin-certs-tbody">
              <!-- Rendered dynamically inside init() -->
            </tbody>
          </table>
        </div>

      </div>
    `;
  }

  static renderRows(filteredCerts) {
    const tbody = document.getElementById('admin-certs-tbody');
    if (!tbody) return;

    if (filteredCerts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center font-sans text-text-light text-[15px]">
            No matching credentials found in inventory.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredCerts.map(cert => {
      let statusBadge = 'bg-stone-50 text-stone-600 border-stone-200';
      if (cert.status === 'Issued') statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      else if (cert.status === 'Revoked') statusBadge = 'bg-rose-50 text-rose-800 border-rose-200';
      else if (cert.status === 'Draft' || cert.status === 'Generated') statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
      else if (cert.status === 'Expired') statusBadge = 'bg-stone-200 text-stone-700 border-stone-300';

      const isRevoked = cert.status === 'Revoked';

      return `
        <tr class="hover:bg-stone-50/50 transition-colors">
          <!-- Recipient -->
          <td class="py-4 pr-4">
            <span class="font-display font-semibold text-[16px] text-text-dark block">${cert.recipientName}</span>
          </td>
          
          <!-- Number and Code -->
          <td class="py-4 px-4">
            <code class="block font-mono text-[13px] text-text-dark font-medium">${cert.certificateNumber}</code>
            <code class="block font-mono text-[12px] text-text-light mt-0.5">Code: ${cert.verificationCode}</code>
          </td>

          <!-- Type and Program -->
          <td class="py-4 px-4">
            <span class="block text-[14px] text-text-dark font-medium">${cert.type}</span>
            <span class="block text-[12px] text-text-light font-sans mt-0.5">${cert.program}</span>
          </td>

          <!-- Issue Date -->
          <td class="py-4 px-4 font-sans text-[14px] text-text-muted">
            ${cert.issueDate}
          </td>

          <!-- Status -->
          <td class="py-4 px-4">
            <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge}">
              ${cert.status}
            </span>
          </td>

          <!-- Actions -->
          <td class="py-4 pl-4 text-right space-x-2 shrink-0">
            <a href="#/admin/certificates/view?id=${cert.id}" class="inline-flex items-center justify-center font-interface font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded border border-stone-300 hover:border-text-dark hover:bg-stone-50 transition-colors">
              View
            </a>
            <button class="inline-flex items-center justify-center font-interface font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded border border-rose-300 text-rose-700 hover:bg-rose-50 transition-colors btn-revoke-cert-action" data-cert-id="${cert.id}" ${isRevoked ? 'disabled class="cursor-not-allowed opacity-50"' : ''}>
              ${isRevoked ? 'Cancelled' : 'Revoke'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Re-bind click handlers for revocation action
    const revokeButtons = document.querySelectorAll('.btn-revoke-cert-action');
    revokeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-cert-id');
        const reason = prompt("Please provide a cancellation reason:");
        if (reason === null) return; // User clicked Cancel

        // Find the certificate and update in-memory status
        const certIndex = certificates.findIndex(c => c.id === id || String(c.id) === String(id));
        if (certIndex !== -1) {
          certificates[certIndex].status = 'Revoked';
          certificates[certIndex].revocationReason = reason || 'Revoked by administrator.';
          
          // Log inside audit logs
          try {
            certificateLogs.unshift({
              id: `log-${Date.now()}`,
              certificateNumber: certificates[certIndex].certificateNumber,
              action: "Certificate Revoked",
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
              operator: "Aman Sharma"
            });
          } catch (err) {
            console.error("Failed to update activity log", err);
          }

          // Trigger view update
          CertificateTable.filterAndRender();
          alert(`Certificate ${certificates[certIndex].certificateNumber} has been successfully revoked.`);
          // Reload page contents to sync other widgets
          window.location.reload();
        }
      });
    });
  }

  static filterAndRender() {
    const searchVal = (document.getElementById('search-admin-certs')?.value || '').toLowerCase().trim();
    const typeVal = document.getElementById('filter-admin-type')?.value || 'All Types';

    const filtered = certificates.filter(c => {
      const matchSearch = c.recipientName.toLowerCase().includes(searchVal) || 
                          c.certificateNumber.toLowerCase().includes(searchVal) || 
                          c.verificationCode.toLowerCase().includes(searchVal);
      const matchType = typeVal === 'All Types' || c.type === typeVal;
      return matchSearch && matchType;
    });

    CertificateTable.renderRows(filtered);
  }

  static init() {
    // Initial draw
    CertificateTable.renderRows(certificates);

    const searchInput = document.getElementById('search-admin-certs');
    const typeFilter = document.getElementById('filter-admin-type');

    if (searchInput) searchInput.addEventListener('input', () => CertificateTable.filterAndRender());
    if (typeFilter) typeFilter.addEventListener('change', () => CertificateTable.filterAndRender());
  }
}
