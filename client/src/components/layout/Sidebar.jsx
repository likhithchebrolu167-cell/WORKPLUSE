import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  CheckSquare,
  Clock,
  BarChart3,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const { user, logout, isAdmin } = useAuth();
  const { notifications } = useData();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { name: 'Overview', to: '/', icon: LayoutDashboard },
    ...(isAdmin ? [] : [{ name: 'My Dashboard', to: '/employee-portal', icon: UserCheck }]),
    { name: 'Employees', to: '/employees', icon: Users },
    { name: 'Departments', to: '/departments', icon: Building2 },
    { name: 'Tasks (Kanban)', to: '/tasks', icon: CheckSquare },
    { name: 'Time Tracking', to: '/time-tracking', icon: Clock },
    { name: 'Productivity Analytics', to: '/analytics', icon: BarChart3 },
    { name: 'Performance Reports', to: '/reports', icon: FileText },
    { name: 'Notifications', to: '/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-[#151B30] text-slate-300 border-r border-[#1E2540] flex flex-col justify-between ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1E2540] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#795CF6] to-[#4285F4] flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  WORK<span className="text-[#795CF6]">PULSE</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Enterprise v2.4
                </span>
              </div>
            )}
          </NavLink>

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg bg-[#101426] hover:bg-[#1E2540] text-slate-400 hover:text-white transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Workforce Navigation
            </div>
          )}

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-[#795CF6] text-white shadow-md shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2540]'
                }`
              }
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1 truncate">{item.name}</span>}
              {!isCollapsed && item.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Area: Help, User Profile & Logout */}
        <div className="p-3 border-t border-[#1E2540] space-y-2">
          {/* Help Center Trigger */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-[#1E2540] transition-colors"
            title="Help & Evaluation Guide"
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Help Center & Guide</span>}
          </button>

          {/* User Profile Card */}
          <div className="bg-[#101426] rounded-xl p-2.5 flex items-center gap-3 border border-[#1E2540]">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-lg object-cover border border-violet-500/30 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{user?.name || 'Sarah Jenkins'}</div>
                <div className="text-[11px] text-slate-400 truncate capitalize">{user?.role === 'admin' ? 'Administrator' : user?.designation || 'Employee'}</div>
              </div>
            )}
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#1E2540] transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-violet-500" />
                WorkPulse Evaluation Guide
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="py-4 text-sm text-slate-600 dark:text-slate-300 space-y-3">
              <p>
                <strong>Welcome to WORKPULSE!</strong> This major enterprise project demonstrates full-stack employee productivity tracking with transparent metrics, Kanban task management, and live attendance tracking.
              </p>
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-700 dark:text-violet-300">
                <strong>Demo Mode Active:</strong> You can switch roles at any time using the quick switcher in the top navigation bar to experience both the <em>Admin Portal</em> and the <em>Employee Portal</em>.
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Admin Login:</strong> admin@workpulse.io / admin123</li>
                <li><strong>Employee Login:</strong> alex.rivera@workpulse.io / employee123</li>
                <li><strong>Formula Transparency:</strong> All calculations are explainable and separated.</li>
                <li><strong>CSV Export:</strong> Ready in the Performance Reports section.</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-[#795CF6] text-white text-xs font-semibold rounded-xl hover:bg-[#6744E8]"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

