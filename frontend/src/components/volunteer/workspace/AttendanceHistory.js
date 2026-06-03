import { attendanceSummary, attendanceLogs } from '../../../mocks/attendance.js';

export default class AttendanceHistory {
  render() {
    const logRows = attendanceLogs.map(log => {
      let statusColor = 'bg-stone-100 text-stone-500 border-stone-200';
      if (log.attendanceStatus === 'Present') {
        statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      } else if (log.attendanceStatus === 'Absent') {
        statusColor = 'bg-rose-50 text-rose-800 border-rose-200';
      } else if (log.attendanceStatus === 'Excused') {
        statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
      }

      return `
        <tr class="border-b border-stone-150 hover:bg-stone-50/50 transition-colors">
          <td class="py-3.5 pr-4 font-display font-semibold text-[15px] text-text-dark">${log.activity}</td>
          <td class="py-3.5 px-4 font-sans text-[14px] text-text-muted">${log.date}</td>
          <td class="py-3.5 pl-4 text-right">
            <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${log.attendanceStatus}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Attendance History</h3>
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-text-light">
            GET /api/attendance
          </span>
        </div>

        <!-- Summary Metric Badges -->
        <div class="grid grid-cols-3 gap-4 p-4 bg-stone-50 border border-stone-200 rounded mb-6 text-center">
          <div>
            <span class="block text-[10px] uppercase tracking-widest text-text-light mb-1">Attendance Rate</span>
            <span class="font-display font-bold text-2xl text-text-dark">${attendanceSummary.attendanceRate}%</span>
          </div>
          <div class="border-x border-stone-200">
            <span class="block text-[10px] uppercase tracking-widest text-text-light mb-1">Attended</span>
            <span class="font-display font-bold text-2xl text-emerald-700">${attendanceSummary.sessionsAttended} Sessions</span>
          </div>
          <div>
            <span class="block text-[10px] uppercase tracking-widest text-text-light mb-1">Missed</span>
            <span class="font-display font-bold text-2xl text-rose-700">${attendanceSummary.sessionsMissed} Sessions</span>
          </div>
        </div>

        <!-- Logs Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[10px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-2.5 pr-4">Session Activity</th>
                <th class="pb-2.5 px-4">Date</th>
                <th class="pb-2.5 pl-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              ${logRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
