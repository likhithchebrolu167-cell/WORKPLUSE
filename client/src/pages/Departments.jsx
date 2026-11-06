import React from 'react';
import {
  Building2,
  Users,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const Departments = () => {
  const { departments, employees, tasks } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Department Performance & Allocations</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Organizational units, department leads, headcount distribution, and active project velocity.
        </p>
      </div>

      {/* 5 Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptEmps = employees.filter((e) => e.department.toLowerCase() === dept.name.toLowerCase());
          const deptTasks = tasks.filter((t) => t.department.toLowerCase() === dept.name.toLowerCase());
          const completedTasks = deptTasks.filter((t) => t.status === 'Completed').length;

          return (
            <div
              key={dept.name}
              className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-premium transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#101426] text-slate-600 dark:text-slate-300">
                      {dept.code}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{dept.name}</h3>
                  </div>

                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: dept.color || '#795CF6' }}
                    title={`Brand color: ${dept.color}`}
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                {/* Lead Card */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                  <img
                    src={dept.leadAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                    alt={dept.lead}
                    className="w-9 h-9 rounded-xl object-cover border border-violet-500/20"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Department Lead</span>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{dept.lead}</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Staff</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{deptEmps.length}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{deptTasks.length}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Budget</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{dept.budget}</span>
                  </div>
                </div>

                {/* Productivity Meter */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Efficiency Index</span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">{dept.currentProductivity}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${dept.currentProductivity}%`,
                        backgroundColor: dept.color || '#795CF6',
                      }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>SLA Target: {dept.targetProductivity}%</span>
                    <span className="text-emerald-500 font-semibold">{completedTasks} Tasks Done</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Allocated Sprint Q4-26</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  Target Met ✓
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

