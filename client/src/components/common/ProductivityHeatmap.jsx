import React from 'react';

export const ProductivityHeatmap = ({ days = [] }) => {
  // If no data passed, generate 70 days
  const data = days.length > 0 ? days : (() => {
    const arr = [];
    const today = new Date();
    for (let i = 69; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const isSun = d.getDay() === 0;
      const count = isSun ? 0 : Math.floor(Math.random() * 7);
      arr.push({
        date: d.toISOString().split('T')[0],
        count,
        level: count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : 3,
      });
    }
    return arr;
  })();

  const levelColors = {
    0: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700/60',
    1: 'bg-violet-200 dark:bg-violet-900/60 border-violet-300 dark:border-violet-700/80',
    2: 'bg-violet-400 dark:bg-violet-600 border-violet-500',
    3: 'bg-violet-600 dark:bg-violet-500 border-violet-700',
  };

  return (
    <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Workforce Productivity Heatmap
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400">
              Last 70 Days
            </span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Daily completed-task velocity across all enterprise departments.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60" />
          <div className="w-3 h-3 rounded-sm bg-violet-200 dark:bg-violet-900/60 border border-violet-300" />
          <div className="w-3 h-3 rounded-sm bg-violet-400 dark:bg-violet-600 border border-violet-500" />
          <div className="w-3 h-3 rounded-sm bg-violet-600 dark:bg-violet-500 border border-violet-700" />
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-wrap gap-1.5 min-w-[500px]">
          {data.map((item, idx) => (
            <div
              key={idx}
              title={`${item.date}: ${item.count} tasks completed`}
              className={`w-3.5 h-3.5 rounded-sm border ${levelColors[item.level]} cursor-pointer transition-transform hover:scale-125`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

