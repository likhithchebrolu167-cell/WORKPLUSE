import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  Filter,
  Users,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { DepartmentBadge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

export const Reports = () => {
  const { employees, tasks, departments } = useData();

  const [reportType, setReportType] = useState('monthly'); // 'daily' | 'weekly' | 'monthly' | 'department'
  const [selectedDept, setSelectedDept] = useState('All');

  // Filter employees for the report table
  const reportRows = employees.filter((emp) => {
    return selectedDept === 'All' || emp.department === selectedDept;
  });

  // Calculate summary metrics
  const avgProductivity = (
    reportRows.reduce((acc, curr) => acc + curr.productivityScore, 0) / (reportRows.length || 1)
  ).toFixed(1);
  const totalCompletedTasks = reportRows.reduce((acc, curr) => acc + curr.completedTasksCount, 0);
  const avgOnTime = (
    reportRows.reduce((acc, curr) => acc + curr.onTimeRate, 0) / (reportRows.length || 1)
  ).toFixed(1);

  // CSV Export Trigger
  const handleExportCSV = () => {
    const headers = [
      'Employee ID',
      'Name',
      'Email',
      'Department',
      'Designation',
      'Productivity Score (%)',
      'Completed Tasks',
      'On-Time Rate (%)',
      'Weekly Hours (h)',
      'Status',
    ];

    const rows = reportRows.map((emp) => [
      `"${emp.employeeId}"`,
      `"${emp.name}"`,
      `"${emp.email}"`,
      `"${emp.department}"`,
      `"${emp.designation}"`,
      emp.productivityScore,
      emp.completedTasksCount,
      emp.onTimeRate,
      emp.weeklyHours,
      `"${emp.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `WorkPulse_Report_${reportType}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Browser Print Trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Actions (hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Performance Reports & Exports</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compile workforce velocity data, department audit logs, and export to CSV or print stylesheets.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* Filter Tabs (hidden on print) */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 no-print">
        {/* Report Frequency Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-[#101426] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
          {[
            { id: 'daily', label: 'Daily Shift' },
            { id: 'weekly', label: 'Weekly Sprint' },
            { id: 'monthly', label: 'Monthly Summary' },
            { id: 'department', label: 'Department Audit' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                reportType === tab.id
                  ? 'bg-[#795CF6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-50 dark:bg-[#101426] text-xs text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Product Management">Product Management</option>
            <option value="Enterprise Sales">Enterprise Sales</option>
          </select>
        </div>
      </div>

      {/* Printable Report Canvas Document */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Formal Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#795CF6]">
              WorkPulse Executive Telemetry Report
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 capitalize">
              {reportType} Workforce Productivity & SLA Audit
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Generated on {new Date().toLocaleString()} by Sarah Jenkins (VP Operations).
            </p>
          </div>

          <div className="text-right sm:border-l sm:pl-6 border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Report Scope</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {selectedDept === 'All' ? 'Enterprise-Wide (5 Depts)' : selectedDept}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              Status: Verified Compliant
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Audited Headcount</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{reportRows.length} Staff</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Average Productivity</span>
            <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{avgProductivity}%</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Deliverables</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalCompletedTasks} Tasks</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">On-Time Completion</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgOnTime}%</span>
          </div>
        </div>

        {/* Detailed Report Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#101426] border-y border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-3">Emp ID</th>
                <th className="py-3 px-3">Full Name</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Tasks Done</th>
                <th className="py-3 px-3">On-Time Rate</th>
                <th className="py-3 px-3">Weekly Hours</th>
                <th className="py-3 px-3">Productivity Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {reportRows.map((emp) => (
                <tr key={emp.employeeId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono font-medium text-slate-400">{emp.employeeId}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{emp.name}</td>
                  <td className="py-3 px-3">
                    <DepartmentBadge department={emp.department} />
                  </td>
                  <td className="py-3 px-3 text-slate-500">{emp.designation}</td>
                  <td className="py-3 px-3 font-bold">{emp.completedTasksCount}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-600 dark:text-emerald-400">{emp.onTimeRate}%</td>
                  <td className="py-3 px-3 font-mono">{emp.weeklyHours}h</td>
                  <td className="py-3 px-3 font-bold text-violet-600 dark:text-violet-400">
                    {emp.productivityScore}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sign-Off Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <div>WorkPulse Automated Reporting Engine • Cryptographic Log Verification Enabled</div>
            <div>Generated under Enterprise License #WP-892410</div>
          </div>
          <div className="text-right">
            <div>Authorized by: <strong>Executive Operations Office</strong></div>
            <div>Sign-off hash: <code>SHA256:7f4a...890b</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

