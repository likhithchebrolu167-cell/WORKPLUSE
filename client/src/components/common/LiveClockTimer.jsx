import React from 'react';
import { Play, Square, Coffee, Clock, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const LiveClockTimer = () => {
  const { sessionStatus, secondsElapsed, clockIn, clockOut, startBreak, endBreak } = useData();

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const statusConfigs = {
    Working: {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500 animate-pulse',
      label: 'Active Work Session',
    },
    'On Break': {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      dot: 'bg-amber-500',
      label: 'On Coffee / Rest Break',
    },
    'Clocked Out': {
      badge: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30',
      dot: 'bg-slate-400',
      label: 'Shift Concluded',
    },
  };

  const currentConfig = statusConfigs[sessionStatus] || statusConfigs.Working;

  return (
    <div className="bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-[#151B30] dark:via-[#151B30] dark:to-[#101426] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Work Session Tracker
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentConfig.badge}`}>
              <span className={`w-2 h-2 rounded-full ${currentConfig.dot}`} />
              {currentConfig.label}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Transparent, user-initiated work session recording. Keystroke/invasive monitoring disabled by policy.
          </p>
        </div>

        {/* Digital Clock Display */}
        <div className="flex items-center gap-3 bg-slate-900 dark:bg-[#0B0F19] text-white px-5 py-3 rounded-xl shadow-inner font-mono">
          <Clock className="w-5 h-5 text-violet-400 animate-pulse" />
          <div className="text-2xl sm:text-3xl font-extrabold tracking-wider">{formatTime(secondsElapsed)}</div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {sessionStatus !== 'Working' ? (
          <button
            onClick={clockIn}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#795CF6] hover:bg-[#6744E8] text-white rounded-xl text-sm font-semibold shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            Clock In
          </button>
        ) : (
          <button
            onClick={clockOut}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Square className="w-4 h-4 fill-white" />
            Clock Out
          </button>
        )}

        {sessionStatus === 'Working' && (
          <button
            onClick={startBreak}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 rounded-xl text-sm font-semibold transition-colors"
          >
            <Coffee className="w-4 h-4" />
            Start Break
          </button>
        )}

        {sessionStatus === 'On Break' && (
          <button
            onClick={endBreak}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-semibold transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            End Break & Resume Work
          </button>
        )}

        <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 flex items-center gap-4">
          <div>
            Scheduled Shift: <span className="font-semibold text-slate-700 dark:text-slate-300">09:00 AM – 06:00 PM</span>
          </div>
          <div>
            Target: <span className="font-semibold text-slate-700 dark:text-slate-300">8.0 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

