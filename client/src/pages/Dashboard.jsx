import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Activity,
  Award,
  Sparkles,
  ArrowUpRight,
  Filter,
  Calendar,
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { LiveClockTimer } from '../components/common/LiveClockTimer';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { employees, tasks, departments, activities } = useData();
  const [chartFilter, setChartFilter] = useState('weekly'); // 'daily' | 'weekly' | 'monthly'

  // Dynamic formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.currentStatus === 'Working' || e.status === 'Active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const avgProductivity = (
    employees.reduce((acc, curr) => acc + (curr.productivityScore || 85), 0) / (totalEmployees || 1)
  ).toFixed(1);

  // Time series datasets
  const timeSeriesData = {
    daily: [
      { time: '09:00 AM', productivity: 84, engineering: 88, design: 82, marketing: 80 },
      { time: '11:00 AM', productivity: 91, engineering: 94, design: 90, marketing: 88 },
      { time: '01:00 PM', productivity: 82, engineering: 85, design: 80, marketing: 81 },
      { time: '03:00 PM', productivity: 95, engineering: 97, design: 94, marketing: 91 },
      { time: '05:00 PM', productivity: 92, engineering: 95, design: 92, marketing: 89 },
    ],
    weekly: [
      { time: 'Mon', productivity: 88.5, engineering: 92, design: 88, marketing: 85 },
      { time: 'Tue', productivity: 92.4, engineering: 95, design: 91, marketing: 89 },
      { time: 'Wed', productivity: 95.8, engineering: 98, design: 95, marketing: 93 },
      { time: 'Thu', productivity: 93.1, engineering: 94, design: 92, marketing: 90 },
      { time: 'Fri', productivity: 91.0, engineering: 93, design: 89, marketing: 87 },
    ],
    monthly: [
      { time: 'Week 1', productivity: 88.2, engineering: 91, design: 87, marketing: 85 },
      { time: 'Week 2', productivity: 91.5, engineering: 93, design: 90, marketing: 88 },
      { time: 'Week 3', productivity: 94.8, engineering: 97, design: 93, marketing: 92 },
      { time: 'Week 4', productivity: 93.4, engineering: 95, design: 92, marketing: 90 },
    ],
  };

  // Task donut breakdown
  const donutData = [
    { name: 'Completed', value: completedTasks, color: '#22C58B' },
    { name: 'In Progress', value: tasks.filter((t) => t.status === 'In Progress').length, color: '#795CF6' },
    { name: 'Review', value: tasks.filter((t) => t.status === 'Review').length, color: '#4285F4' },
    { name: 'To Do', value: tasks.filter((t) => t.status === 'To Do').length, color: '#F5A623' },
  ];

  // Department comparison
  const deptData = departments.map((d) => ({
    name: d.name.length > 12 ? d.code : d.name,
    productivity: d.currentProductivity || 90,
    target: d.targetProductivity || 90,
  }));

  // Top performers
  const topPerformers = [...employees].sort((a, b) => b.productivityScore - a.productivityScore).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Hero Greeting Section */}
      <div className="bg-gradient-to-r from-[#101426] via-[#151B30] to-[#1E2540] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Real-Time Enterprise Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good Morning, {user?.name?.split(' ')[0] || 'Admin'} 👋
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-xl">
              Here's what's happening with your workforce today. All systems operational with{' '}
              <span className="text-emerald-400 font-semibold">{avgProductivity}% average productivity</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium">
              <Calendar className="w-4 h-4 text-violet-300" />
              <span>{todayFormatted}</span>
            </div>

            <Link
              to="/reports"
              className="px-4 py-2.5 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/30 flex items-center gap-1.5"
            >
              Export Report
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Live Working Hours Timer Panel */}
      <LiveClockTimer />

      {/* Six Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Total Employees"
          value={totalEmployees}
          change="+2 this month"
          isPositive={true}
          icon={Users}
          color="violet"
          sparkline={[20, 21, 21, 23, 23, 24, 25]}
        />
        <KpiCard
          title="Active Employees"
          value={activeEmployees}
          change="92% active today"
          isPositive={true}
          icon={UserCheck}
          color="emerald"
          sparkline={[22, 23, 22, 24, 25, 24, 25]}
        />
        <KpiCard
          title="Tasks Completed"
          value={completedTasks}
          change="+18% sprint uplift"
          isPositive={true}
          icon={CheckCircle2}
          color="blue"
          sparkline={[8, 12, 14, 18, 16, 21, 24]}
        />
        <KpiCard
          title="Pending Tasks"
          value={pendingTasks}
          change="-4 vs yesterday"
          isPositive={true}
          icon={Clock}
          color="amber"
          sparkline={[28, 25, 23, 22, 20, 18, 16]}
        />
        <KpiCard
          title="Avg Productivity"
          value={`${avgProductivity}%`}
          change="+3.4% this cycle"
          isPositive={true}
          icon={TrendingUp}
          color="violet"
          sparkline={[86, 88, 89, 90, 91, 92, 93]}
        />
        <KpiCard
          title="Total Working Hours"
          value="1,480h"
          change="99.2% target met"
          isPositive={true}
          icon={Activity}
          color="rose"
          sparkline={[180, 210, 230, 240, 255, 270, 285]}
        />
      </div>

      {/* Main Analytics Area: Large Productivity Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Line / Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Workforce Productivity Overview
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Multi-series efficiency metrics across core engineering and operational departments.
              </p>
            </div>

            {/* Daily, Weekly, Monthly Filter Tabs */}
            <div className="flex items-center bg-slate-100 dark:bg-[#101426] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
              {['daily', 'weekly', 'monthly'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChartFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    chartFilter === filter
                      ? 'bg-[#795CF6] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData[chartFilter] || timeSeriesData.weekly}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#795CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#795CF6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                  formatter={(val) => [`${val}%`, 'Productivity']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="productivity"
                  name="Overall Workforce"
                  stroke="#795CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorProd)"
                />
                <Area
                  type="monotone"
                  dataKey="engineering"
                  name="Engineering Team"
                  stroke="#4285F4"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorEng)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Donut Chart */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Task Completion Ratio</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live status breakdown of all {totalTasks} tracked deliverables.
            </p>
          </div>

          <div className="h-48 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {Math.round((completedTasks / (totalTasks || 1)) * 100)}%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Done</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {donutData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#101426]">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate">{item.name}</span>
                <span className="ml-auto font-bold text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Visualizations: Department Bar Chart & Smart Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Productivity Bar Chart */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Department Velocity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Current efficiency score compared against department SLA target (90%).
              </p>
            </div>
            <Link to="/departments" className="text-xs font-semibold text-[#795CF6] hover:underline">
              All Departments →
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[75, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B30',
                    borderColor: '#1E2540',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`${val}%`, 'Productivity']}
                />
                <Bar dataKey="productivity" fill="#795CF6" radius={[6, 6, 0, 0]} name="Current Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Heuristic AI Observations */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Productivity Insights</h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                Explainable AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Rule-based heuristic analytics engine synthesizing attendance, task cycle-time, and sprint velocity.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Engineering Sprint Velocity (+14.2%)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Engineering department task completion increased by 14.2% compared to last week with zero regressions.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    On-Time Delivery Index (97.4%)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    97.4% of all completed tasks met or preceded the target milestone deadline.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Approaching Sprint Deadline
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    4 critical tasks in the Review stage require administrator sign-off before Friday 5:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            Transparent observations generated from recorded sessions. No black-box scoring.
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Performers & Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Top Workforce Performers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Recognizing exceptional task completion velocity and high on-time delivery.
              </p>
            </div>
            <Link to="/employees" className="text-xs font-semibold text-[#795CF6] hover:underline">
              View All Employees →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topPerformers.map((emp, idx) => (
              <div key={emp.employeeId} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-10 h-10 rounded-xl object-cover border border-violet-500/20"
                    />
                    <span
                      className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white ${
                        idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-amber-700' : 'bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{emp.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {emp.designation} • <span className="text-violet-600 dark:text-violet-400 font-medium">{emp.department}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{emp.completedTasksCount} Tasks Done</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{emp.onTimeRate}% on-time</div>
                  </div>

                  <div className="w-16 sm:w-24">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-violet-600 dark:text-violet-400">{emp.productivityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                        style={{ width: `${emp.productivityScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <span className="text-xs font-medium text-slate-400">Live stream</span>
          </div>

          <div className="space-y-4">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                {act.actor?.avatar ? (
                  <img
                    src={act.actor.avatar}
                    alt=""
                    className="w-7 h-7 rounded-lg object-cover flex-shrink-0 mt-0.5"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    WP
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white leading-snug">{act.title}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{act.description}</p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

