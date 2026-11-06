import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const configs = {
    Urgent: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    High: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Medium: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Low: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  const dots = {
    Urgent: 'bg-rose-500',
    High: 'bg-amber-500',
    Medium: 'bg-indigo-500',
    Low: 'bg-slate-400',
  };

  const style = configs[priority] || configs.Medium;
  const dot = dots[priority] || dots.Medium;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const configs = {
    'Completed': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'In Progress': 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    'Review': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'To Do': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Active': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Remote': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    'On Leave': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Inactive': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    'Working': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'On Break': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Clocked Out': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    'Present': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Late': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    'Half Day': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  };

  const style = configs[status] || 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {status}
    </span>
  );
};

export const DepartmentBadge = ({ department }) => {
  const configs = {
    'Engineering': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Product Design': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'Marketing': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Product Management': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Enterprise Sales': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const style = configs[department] || 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${style}`}>
      {department}
    </span>
  );
};

