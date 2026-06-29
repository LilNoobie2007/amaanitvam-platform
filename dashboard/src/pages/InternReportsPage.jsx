import { useState, useEffect } from 'react';
import { BarChart3, Loader2 } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

export default function InternReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Placeholder logic for now since backend routes might not exist yet
    // api.get('/reports').then(({ data }) => setReports(data.reports || [])).catch(() => toast.error('Failed to load reports')).finally(() => setLoading(false));
    setLoading(false);
  }, []);

  // Simple CSV Downloader Logic
  const handleDownloadCSV = () => {
    // 1. Create column headers matching attendance, tasks, and projects
    let csvContent = "User Name,Attendance,Tasks,Projects\n";
    
    // 2. Loop through the reports array
    reports.forEach((item) => {
      let row = `${item.userName || 'N/A'},${item.attendance || '0%'},${item.tasks || 'None'},${item.projects || 'None'}\n`;
      csvContent += row;
    });
    
    // 3. Browser download triggers
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'All_Members_Report.csv');
    link.click();
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 text-[#56051a] animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          {/* Renamed Header from "Intern Reports" to "All Members Reports" */}
          <h1 className="text-2xl font-bold text-slate-900">All Members Reports</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage performance reports for all roles</p>
        </div>
        
        {/* Added the Download Button that triggers the CSV layout */}
        <button 
          onClick={handleDownloadCSV}
          className="px-4 py-2 bg-[#56051a] text-white text-sm font-medium rounded-xl hover:bg-opacity-90 transition-all"
        >
          Download CSV Report
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400">No reports found. Backend implementation pending (Task assigned to Person 2).</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Map reports here */}
        </div>
      )}
    </div>
  );
}
