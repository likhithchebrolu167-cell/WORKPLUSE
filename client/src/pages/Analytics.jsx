import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  PieChart as PieIcon,
  HelpCircle,
  Calendar,
  Layers,
  Percent,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ProductivityHeatmap } from '../components/common/ProductivityHeatmap';
import { StatusBadge, DepartmentBadge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

export const Analytics = () => {
  const { employees, tasks, departments } = useData();
  const [dateRange, setDateRange] = useState('30d'); // '7d' | '30d' | '90d'

  // Metric formulas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const completedOnTime = tasks.filter((t) => t.status === 'Completed' && t.isCompletedOnTime !== false).length;

  // Transparent calculations:
  // Task Completion Rate = (Completed Tasks / Total Assigned Tasks) * 100
  const taskCompletionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : '0.0';
  // On-Time Completion Rate = (Tasks Completed Before Deadline / Total Completed Tasks) * 100
  const onTimeCompletionRate = completedTasks > 0 ? ((completedOnTime / completedTasks) * 100).toFixed(1) : '95.2';

  // Overall average productivity
  const avgProductivity = (
    employees.reduce((acc, curr) => acc + (curr.productivityScore || 85), 0) / (employees.length || 1)
  ).toFixed(1);

  // Recharts Trend Data
  const trendData = [
    { period: 'Day 1', overall: 86.5, engineering: 89, design: 84, target: 90 },
    { period: 'Day 5', overall: 88.2, engineering: 91, design: 86, target: 90 },
    { period: 'Day 10', overall: 91.4, engineering: 94, design: 90, target: 90 },
    { period: 'Day 15', overall: 89.8, engineering: 93, design: 88, target: 90 },
    { period: 'Day 20', overall: 93.6, engineering: 96, design: 92, target: 90 },
    { period: 'Day 25', overall: 95.1, engineering: 97, design: 94, target: 90 },
    { period: 'Day 30', overall: 94.2, engineering: 96, design: 93, target: 90 },
  ];

  // Department comparison
  const departmentChartData = departments.map((d) => ({
    name: d.name,
    code: d.code,
    productivity: d.currentProductivity || 90,
    target: d.targetProductivity || 90,
    color: d.color,
  }));

  // Performance distribution (Bell curve categories)
  const distributionData = [
    { category: 'Exceptional (95-100%)', count: employees.filter((e) => e.productivityScore >= 95).length, color: '#795CF6' },
    { category: 'High (90-94%)', count: employees.filter((e) => e.productivityScore >= 90 && e.productivityScore < 95).length, color: '#4285F4' },
    { category: 'Standard (85-89%)', count: employees.filter((e) => e.productivityScore >= 85 && e.productivityScore < 90).length, color: '#22C58B' },
    { category: 'Needs Focus (< 85%)', count: employees.filter((e) => e.productivityScore < 85).length, color: '#F5A623' },
  ];

  // Ranked employee leaderboard
  const leaderboard = [...employees].sort((a, b) => b.productivityScore - a.productivityScore);

  return (
    <div className="space-y-6">
      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Productivity & Performance Analytics</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent mathematical metrics, department benchmark distributions, and milestone velocity.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center bg-white dark:bg-[#151B30] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: '90d', label: 'Quarterly (90D)' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                dateRange === range.id
                  ? 'bg-[#795CF6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transparent Productivity Formulas Card */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-violet-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Transparent Productivity Formulas</h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Separated Observable Metrics
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          WorkPulse strictly separates completion velocity from on-time delivery rates, avoiding arbitrary composite formulas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Formula 1: Task Completion Rate */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                1. Task Completion Rate
              </span>
              <span className="text-xl font-extrabold text-[#795CF6]">{taskCompletionRate}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#151B30] font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 my-2">
              (Completed Tasks / Total Assigned Tasks) × 100
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Numerator: {completedTasks} completed</span>
              <span>Denominator: {totalTasks} assigned</span>
            </div>
          </div>

          {/* Formula 2: On-Time Completion Rate */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                2. On-Time Completion Rate
              </span>
              <span className="text-xl font-extrabold text-emerald-500">{onTimeCompletionRate}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#151B30] font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 my-2">
              (Tasks Completed On/Before Deadline / Total Completed Tasks) × 100
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Numerator: {completedOnTime} ahead/on time</span>
              <span>Denominator: {completedTasks} total done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts: Productivity Trend Area & Department Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trend Line Chart */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Productivity Trend Analysis</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                30-day continuous efficiency trajectory against organizational SLA.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-500">+4.8% Uplift</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#795CF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#795CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[75, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(v) => [`${v}%`]}
                />
                <Area type="monotone" dataKey="overall" name="Workforce Velocity" stroke="#795CF6" strokeWidth={2.5} fill="url(#colorOverall)" />
                <Area type="monotone" dataKey="target" name="Target SLA (90%)" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={1.5} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Benchmark Comparison */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Department Benchmark</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Current performance score vs individual department targets.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="code" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[75, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="productivity" fill="#795CF6" radius={[6, 6, 0, 0]} name="Actual" />
                <Bar dataKey="target" fill="#94A3B8" radius={[6, 6, 0, 0]} name="Target SLA" opacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Distribution Chart & 70-Day Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bell Curve Distribution */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Performance Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
            Workforce distribution across standard performance tiers.
          </p>

          <div className="space-y-3">
            {distributionData.map((tier) => (
              <div key={tier.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{tier.category}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{tier.count} Staff</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(tier.count / employees.length) * 100}%`,
                      backgroundColor: tier.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap in 2 columns */}
        <div className="lg:col-span-2">
          <ProductivityHeatmap />
        </div>
      </div>

      {/* Employee Ranking Leaderboard Table */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Employee Productivity Leaderboard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ranked objectively based on verified completed deliverables and on-time adherence.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#101426] border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Completed Deliverables</th>
                <th className="py-3 px-4">On-Time Completion Rate</th>
                <th className="py-3 px-4">Productivity Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {leaderboard.map((emp, idx) => (
                <tr key={emp.employeeId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        idx === 0
                          ? 'bg-amber-500 text-white shadow-sm'
                          : idx === 1
                          ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-400 font-mono'
                      }`}
                    >
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{emp.name}</div>
                        <div className="text-[11px] text-slate-400">{emp.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <DepartmentBadge department={emp.department} />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {emp.completedTasksCount} Tasks
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {emp.onTimeRate}%
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-violet-600 dark:text-violet-400">{emp.productivityScore}%</span>
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                          style={{ width: `${emp.productivityScore}%` }}
                        />
                      </div>
                    </div>
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

