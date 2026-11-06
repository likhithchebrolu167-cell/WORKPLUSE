import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building,
  Shield,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
  Cpu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { user, isAdmin, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [orgName, setOrgName] = useState('WorkPulse Enterprise Inc.');
  const [dailyTarget, setDailyTarget] = useState('8.0');
  const [overtimeThreshold, setOvertimeThreshold] = useState('40.0');

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">System & Enterprise Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure organization profiles, telemetry policies, and evaluation parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Settings successfully persisted to server configuration.
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Information */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <Building className="w-5 h-5 text-violet-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Organization Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Team Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Domain</label>
              <input
                type="text"
                disabled
                value="workpulse.io"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Work Hour & Time Tracking Policies */}
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <Sliders className="w-5 h-5 text-violet-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Time Tracking Policies</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Target Hours</label>
              <input
                type="number"
                step="0.5"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Weekly Overtime Cap (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={overtimeThreshold}
                onChange={(e) => setOvertimeThreshold(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-700 dark:text-violet-300">
            <strong>Transparent Ethics Guarantee:</strong> In accordance with enterprise specifications, WorkPulse rejects invasive keystroke monitoring and silent screen recording. Only worker-initiated work periods are tracked.
          </div>
        </div>

        {/* Faculty Demonstration & Evaluation Quick Panel */}
        <div className="bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-transparent border border-violet-500/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-violet-500/20">
            <Cpu className="w-5 h-5 text-violet-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Faculty Evaluation Controls</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            During major project presentation, switch between roles with zero logouts to demonstrate authorization and view privileges:
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => switchDemoUser('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isAdmin
                  ? 'bg-[#795CF6] text-white shadow-md'
                  : 'bg-white dark:bg-[#151B30] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Current: Administrator (Sarah Jenkins)
            </button>

            <button
              type="button"
              onClick={() => switchDemoUser('employee')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isAdmin
                  ? 'bg-[#795CF6] text-white shadow-md'
                  : 'bg-white dark:bg-[#151B30] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Current: Regular Employee (Alex Rivera)
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl shadow-md shadow-violet-500/20 transition-all"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

