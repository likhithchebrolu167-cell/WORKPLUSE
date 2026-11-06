import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const KpiCard = ({ title, value, change, isPositive = true, icon: Icon, color = 'violet', sparkline = [] }) => {
  const colorMap = {
    violet: {
      bg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      stroke: '#795CF6',
      fill: 'rgba(121, 92, 246, 0.1)',
    },
    blue: {
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      stroke: '#4285F4',
      fill: 'rgba(66, 133, 244, 0.1)',
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      stroke: '#22C58B',
      fill: 'rgba(34, 197, 139, 0.1)',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      stroke: '#F5A623',
      fill: 'rgba(245, 166, 35, 0.1)',
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      stroke: '#F05B67',
      fill: 'rgba(240, 91, 103, 0.1)',
    },
    navy: {
      bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300',
      stroke: '#1E2540',
      fill: 'rgba(30, 37, 64, 0.1)',
    },
  };

  const scheme = colorMap[color] || colorMap.violet;

  // Default demo sparkline points if none provided
  const points = sparkline.length > 0 ? sparkline : [35, 42, 38, 55, 50, 68, 62, 79];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const pathD = points
    .map((pt, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((pt - min) / range) * (height - 6) - 3;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="group relative bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">{title}</span>
        <div className={`p-2 rounded-xl ${scheme.bg} transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          </div>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="h-8 w-20 opacity-80 group-hover:opacity-100 transition-opacity">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <path d={pathD} fill="none" stroke={scheme.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

