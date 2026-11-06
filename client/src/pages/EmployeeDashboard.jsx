import React from 'react';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  AlertCircle,
  Play,
  Square,
  Coffee,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { LiveClockTimer } from '../components/common/LiveClockTimer';
import { PriorityBadge, StatusBadge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { tasks, updateTaskStatus, sessionStatus, secondsElapsed } = useData();

  // Find tasks assigned to this employee (default to EMP-101 Alex Rivera if not set)
  const currentEmpId = user?.employeeId || 'EMP-101';
  const myTasks = tasks.filter((t) => t.assignedTo?.id === currentEmpId);

  const completedCount = myTasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = myTasks.filter((t) => t.status === 'In Progress').length;
  const pendingCount = myTasks.length - completedCount;

  // Personal weekly productivity chart
  const personalWeekly = [
    { day: 'Mon', score: 94, hours: 8.2 },
    { day: 'Tue', score: 96, hours: 8.5 },
    { day: 'Wed', score: 98, hours: 8.8 },
    { day: 'Thu', score: 95, hours: 8.1 },
    { day: 'Fri', score: 97, hours: 8.0 },
  ];

  const handleProgressTask = (taskId, currentStatus) => {
    if (currentStatus === 'To Do') updateTaskStatus(taskId, 'In Progress');
    else if (currentStatus === 'In Progress') updateTaskStatus(taskId, 'Review');
    else if (currentStatus === 'Review') updateTaskStatus(taskId, 'Completed');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#151B30] via-[#101426] to-[#1E2540] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Employee Self-Service Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {user?.name || 'Alex Rivera'}!
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                {user?.designation || 'Senior Frontend Engineer'} • <span className="text-violet-400">{user?.department || 'Engineering'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-300">Your Productivity Index</span>
              <span className="text-2xl font-black text-emerald-400">96.4%</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-300">Sprint On-Time</span>
              <span className="text-2xl font-black text-violet-300">98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Time Tracking Panel for Employee */}
      <LiveClockTimer />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>MY ASSIGNED TASKS</span>
            <CheckCircle2 className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{myTasks.length}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active in Sprint 24-B</div>
        </div>

        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>COMPLETED DELIVERABLES</span>
            <Check className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">{completedCount}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">100% verified on time</div>
        </div>

        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>PENDING / IN PROGRESS</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-500 mt-2">{pendingCount}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{inProgressCount} actively in progress</div>
        </div>

        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>HOURS LOGGED THIS WEEK</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">41.2h</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Target 40h met</div>
        </div>
      </div>

      {/* Main Employee Content: Assigned Deliverables & Personal Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Deliverables with 1-Click Status Update */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">My Active Deliverables</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Update your progress directly. Changes reflect in real-time across the company Kanban.
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
              {myTasks.length} Assigned
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {myTasks.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No active tasks assigned to your employee profile currently.
              </div>
            ) : (
              myTasks.map((task) => (
                <div key={task.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{task.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {task.description}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Due: <strong className="text-slate-700 dark:text-slate-300">{task.deadline}</strong></span>
                      <span>Tags: {task.tags?.join(', ')}</span>
                    </div>
                  </div>

                  {/* 1-Click Status Advancement Button */}
                  {task.status !== 'Completed' ? (
                    <button
                      onClick={() => handleProgressTask(task.id, task.status)}
                      className="px-3.5 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-[#795CF6] dark:text-violet-400 border border-violet-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto flex-shrink-0"
                    >
                      <span>
                        {task.status === 'To Do' && 'Start Task →'}
                        {task.status === 'In Progress' && 'Send to Review →'}
                        {task.status === 'Review' && 'Mark as Done ✓'}
                      </span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      Deliverable Finished
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Personal Performance Trend */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Personal Velocity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily recorded output this sprint cycle.
            </p>

            <div className="h-52 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={personalWeekly}>
                  <defs>
                    <linearGradient id="personalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C58B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22C58B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[85, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#151B30',
                      borderColor: '#1E2540',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#22C58B" strokeWidth={2.5} fill="url(#personalGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-700 dark:text-violet-300">
            <strong>Exemplary Standing:</strong> Your deliverables are ranking in the top 5% of the company this month!
          </div>
        </div>
      </div>
    </div>
  );
};

