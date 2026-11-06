import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Menu,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const TopNavbar = ({ toggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout, switchDemoUser } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, employees, tasks } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute dynamic title & breadcrumb
  const path = location.pathname;
  let pageTitle = 'Overview & Analytics';
  let breadcrumbs = ['WORKPULSE', 'Overview'];

  if (path === '/employees') {
    pageTitle = 'Employee Workforce Directory';
    breadcrumbs = ['WORKPULSE', 'Employees'];
  } else if (path === '/departments') {
    pageTitle = 'Department Performance';
    breadcrumbs = ['WORKPULSE', 'Departments'];
  } else if (path === '/tasks') {
    pageTitle = 'Task Management (Kanban)';
    breadcrumbs = ['WORKPULSE', 'Tasks'];
  } else if (path === '/time-tracking') {
    pageTitle = 'Time Tracking & Attendance';
    breadcrumbs = ['WORKPULSE', 'Time Tracking'];
  } else if (path === '/analytics') {
    pageTitle = 'Productivity Analytics';
    breadcrumbs = ['WORKPULSE', 'Productivity Analytics'];
  } else if (path === '/reports') {
    pageTitle = 'Performance Reports & Exports';
    breadcrumbs = ['WORKPULSE', 'Reports'];
  } else if (path === '/notifications') {
    pageTitle = 'Enterprise Notifications';
    breadcrumbs = ['WORKPULSE', 'Notifications'];
  } else if (path === '/settings') {
    pageTitle = 'System Settings';
    breadcrumbs = ['WORKPULSE', 'Settings'];
  } else if (path === '/employee-portal') {
    pageTitle = 'Employee Self-Service Portal';
    breadcrumbs = ['WORKPULSE', 'Employee Portal'];
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Search filter
  const matchingEmployees = searchQuery.trim()
    ? employees.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];
  const matchingTasks = searchQuery.trim()
    ? tasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#101426]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Breadcrumbs + Dynamic Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  <span className={idx === breadcrumbs.length - 1 ? 'text-slate-700 dark:text-slate-200 font-semibold' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search employees, tasks, departments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full bg-slate-100/80 dark:bg-[#151B30] text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-50 text-xs">
              {matchingEmployees.length === 0 && matchingTasks.length === 0 ? (
                <div className="py-4 text-center text-slate-400">No matching records found</div>
              ) : (
                <div className="space-y-3">
                  {matchingEmployees.length > 0 && (
                    <div>
                      <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                        Employees
                      </div>
                      {matchingEmployees.map((e) => (
                        <div
                          key={e.employeeId}
                          onClick={() => {
                            navigate('/employees');
                            setShowSearchResults(false);
                          }}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <img src={e.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">{e.name}</span>
                          <span className="text-[10px] text-slate-400 ml-auto">{e.designation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingTasks.length > 0 && (
                    <div>
                      <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                        Tasks
                      </div>
                      {matchingTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            navigate('/tasks');
                            setShowSearchResults(false);
                          }}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[240px]">
                            {t.title}
                          </span>
                          <span className="text-[10px] text-violet-500 font-semibold">{t.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Switcher Pill (Crucial for faculty evaluation!) */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-[#151B30] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => switchDemoUser('admin')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                isAdmin
                  ? 'bg-[#795CF6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin View
            </button>
            <button
              onClick={() => {
                switchDemoUser('employee');
                navigate('/employee-portal');
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                !isAdmin
                  ? 'bg-[#795CF6] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Employee View
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#151B30] border border-slate-200/60 dark:border-slate-800 transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Notification Bell with Badge & Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#151B30] border border-slate-200/60 dark:border-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-[#795CF6] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="py-2 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                        !n.read ? 'bg-violet-500/5 dark:bg-violet-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-[#795CF6] hover:text-[#6744E8]"
                  >
                    View Notification Center →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#151B30] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt=""
                className="w-8 h-8 rounded-lg object-cover border border-violet-500/30"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 uppercase">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      switchDemoUser(isAdmin ? 'employee' : 'admin');
                      setShowProfileMenu(false);
                      if (isAdmin) navigate('/employee-portal');
                      else navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-between"
                  >
                    <span>Switch to {isAdmin ? 'Alex Rivera (Emp)' : 'Sarah Jenkins (Admin)'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
                  </button>

                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Organization Settings
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-500/10 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

