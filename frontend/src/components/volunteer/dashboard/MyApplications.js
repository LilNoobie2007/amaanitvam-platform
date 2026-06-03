import { applications as mockApplications } from '../../../mocks/applications.js';

export default class MyApplications {
  render() {
    // Merge mock applications with session-stored applications
    let apps = [...mockApplications];
    try {
      const sessionAppsJson = sessionStorage.getItem('amaanitvam_my_applications');
      if (sessionAppsJson) {
        const sessionApps = JSON.parse(sessionAppsJson);
        const existingIds = new Set(apps.map(a => a.id));
        sessionApps.forEach(sa => {
          if (!existingIds.has(sa.id)) {
            apps.unshift(sa); // Prepend new applications
          }
        });
      }
    } catch (err) {
      console.error("Failed to load session applications", err);
    }

    const appRows = apps.map(app => {
      let statusBadge = 'bg-stone-100 text-stone-700 border-stone-200';
      if (app.status === 'Applied') {
        statusBadge = 'bg-sky-50 text-sky-700 border-sky-200/60';
      } else if (app.status === 'Under Review') {
        statusBadge = 'bg-amber-50 text-amber-800 border-amber-200/60';
      } else if (app.status === 'Onboarded' || app.status === 'Active') {
        statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200/60';
      }

      return `
        <tr class="border-b border-stone-200/60 hover:bg-stone-50/50 transition-colors">
          <td class="py-4 pr-4 font-display font-semibold text-[16px] text-text-dark">${app.title}</td>
          <td class="py-4 px-4 font-sans text-[15px] text-text-muted">${app.appliedDate}</td>
          <td class="py-4 pl-4 text-right">
            <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1 border rounded-full ${statusBadge}">
              ${app.status}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Applications</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/applications
          </span>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[11px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-3 pr-4 font-bold">Role Preference</th>
                <th class="pb-3 px-4 font-bold">Date Applied</th>
                <th class="pb-3 pl-4 text-right font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              ${appRows.length > 0 ? appRows : `
                <tr>
                  <td colspan="3" class="py-8 text-center font-sans text-text-light text-[15px]">
                    No active applications found. Use the public portal to apply.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
