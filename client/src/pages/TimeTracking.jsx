import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Coffee,
  CheckCircle2,
  CalendarDays,
  History,
  TrendingUp,
  Download,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { StatusBadge } from '../components/common/Badge';
import { LiveClockTimer } from '../components/common/LiveClockTimer';
import { ProductivityHeatmap } from '../components/common/ProductivityHeatmap';
import { useData } from '../context/DataContext';

export const TimeTracking = () => {
  const { attendance, sessionStatus, employees } = useData();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchEmp, setSearchEmp] = useState('');

  // Weekly summary mock data for Recharts
  const weeklyHoursData = [
    { day: 'Mon', workHours: 8.2, breakHours: 0.8 },
    { day: 'Tue', workHours: 8.5, breakHours: 0.75 },
    { day: 'Wed', workHours: 8.8, breakHours: 0.9 },
    { day: 'Thu', workHours: 8.1, breakHours: 0.7 },
    { day: 'Fri', workHours: 7.9, breakHours: 0.8 },
    { day: 'Sat', workHours: 3.5, breakHours: 0.4 },
  ];

  // Filter attendance records
  const filteredAttendance = attendance.filter((rec) => {
    const matchesDept = selectedDept === 'All' || rec.department === selectedDept;
    const matchesEmp = !searchEmp || rec.employeeName.toLowerCase().includes(searchEmp.toLowerCase());
    return matchesDept && matchesEmp;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Time Tracking & Attendance</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Auditable, transparent work session logging and shift reconciliation across all workforce departments.
        </p>
      </div>

      {/* Main Live Working Hours Tracker */}
      <LiveClockTimer />

      {/* Weekly Summary & Month Calendar Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Hours Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Weekly Working Hours Summary</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Active work duration vs recorded rest breaks (Target: 40 hrs/week).
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                Work Hours
              </span>
              <span className="flex items-center gap-1.5 text-amber-500">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Breaks
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHoursData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}h`} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val, name) => [`${val} hrs`, name === 'workHours' ? 'Productive Work' : 'Break Time']}
                />
                <Bar dataKey="workHours" fill="#795CF6" radius={[6, 6, 0, 0]} name="workHours" />
                <Bar dataKey="breakHours" fill="#F5A623" radius={[6, 6, 0, 0]} name="breakHours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Shift Rules / Telemetry */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Shift Policy Compliance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Automated rules enforced transparently without surveillance software.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Standard Shift</span>
                <span className="font-bold text-slate-900 dark:text-white">8.0 hrs / day</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Mandatory Rest Break</span>
                <span className="font-bold text-slate-900 dark:text-white">45 - 60 min</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Grace Period</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">15 min grace window</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Overtime Multiplier</span>
                <span className="font-bold text-violet-600 dark:text-violet-400">1.5x (after 40h)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Work sessions are initiated strictly by the worker. No screenshotting or background activity harvesting is ever permitted.
          </div>
        </div>
      </div>

      {/* 70-Day Heatmap */}
      <ProductivityHeatmap />

      {/* Attendance History Table */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-violet-500" />
              Recorded Attendance History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical clock-in, clock-out, break duration, and calculated net working hours.
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter by employee name..."
              value={searchEmp}
              onChange={(e) => setSearchEmp(e.target.value)}
              className="bg-slate-50 dark:bg-[#101426] text-xs text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
            />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-50 dark:bg-[#101426] text-xs text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800"
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#101426] border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Clock In</th>
                <th className="py-3 px-4">Clock Out</th>
                <th className="py-3 px-4">Break Time</th>
                <th className="py-3 px-4">Net Working Hours</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredAttendance.slice(0, 15).map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium">{rec.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{rec.employeeName}</td>
                  <td className="py-3.5 px-4">{rec.department}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">{rec.clockIn}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {rec.clockOut || <span className="text-emerald-500 font-semibold animate-pulse">In Session</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{rec.breakMinutes || 45} mins</td>
                  <td className="py-3.5 px-4 font-bold text-violet-600 dark:text-violet-400">
                    {rec.workingHours} hrs
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={rec.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

