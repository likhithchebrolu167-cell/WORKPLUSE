import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Briefcase,
  TrendingUp,
  ShieldAlert,
  Check,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const Notifications = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'unread' | 'deadline' | 'assignment'

  const filtered = notifications.filter((n) => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'deadline') return n.type === 'deadline' || n.type === 'overdue';
    if (filterType === 'assignment') return n.type === 'assignment';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'deadline':
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'assignment':
        return <Briefcase className="w-5 h-5 text-violet-500" />;
      case 'performance':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise Notification Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational alerts, task milestone triggers, deadline warnings, and audit logs.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#151B30] hover:bg-slate-200 dark:hover:bg-[#1E2540] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <Check className="w-4 h-4 text-emerald-500" />
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: 'Unread Only' },
          { id: 'deadline', label: 'Milestones & Deadlines' },
          { id: 'assignment', label: 'Task Assignments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === tab.id
                ? 'bg-[#795CF6] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">No notifications in this category.</div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`py-4 px-3 rounded-xl flex items-start gap-4 cursor-pointer transition-all ${
                !item.read
                  ? 'bg-violet-50/60 dark:bg-violet-950/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#101426] border border-slate-200/60 dark:border-slate-800 shadow-sm flex-shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.type}
                  </span>
                  {!item.read && (
                    <span className="text-[10px] font-bold text-[#795CF6] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#795CF6]" />
                      Unread
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

