import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/common/Modal';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@workpulse.io');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      if (email.includes('alex')) {
        navigate('/employee-portal');
      } else {
        navigate('/');
      }
    } else {
      setErrorMsg(res.message || 'Invalid email or password');
    }
  };

  const handleQuickLogin = async (type) => {
    if (type === 'admin') {
      setEmail('admin@workpulse.io');
      setPassword('admin123');
      await login('admin@workpulse.io', 'admin123');
      navigate('/');
    } else {
      setEmail('alex.rivera@workpulse.io');
      setPassword('employee123');
      await login('alex.rivera@workpulse.io', 'employee123');
      navigate('/employee-portal');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F5F6FA] dark:bg-[#0B0F19]">
      {/* Left Column: Premium Branding & SaaS Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#101426] via-[#151B30] to-[#1E2540] text-white p-12 flex-col justify-between overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#795CF6] to-[#4285F4] flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              WORK<span className="text-[#795CF6]">PULSE</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Smarter Teams. Better Performance.
            </span>
          </div>
        </div>

        {/* Center Presentation Pitch */}
        <div className="relative z-10 space-y-6 max-w-lg my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Enterprise Workforce Telemetry v2.4
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            The Intelligent Productivity Platform for High-Velocity Teams.
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Eliminate guesswork with transparent milestone formulas, Kanban sprint velocity, auditable time tracking, and real-time executive reports.
          </p>

          {/* Floating SaaS Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Sprint 24-B On-Time Delivery</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                97.4%
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[97.4%] h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Audited 25 employees across 5 departments</span>
              <span>Zero spyware policy</span>
            </div>
          </div>
        </div>

        {/* Bottom Faculty Notice */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-4">
          <span>College Major Project Demonstration</span>
          <span>Role-Based Access Control Active</span>
        </div>
      </div>

      {/* Right Column: Authentication Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo View */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#795CF6] to-[#4285F4] flex items-center justify-center text-white">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                WORK<span className="text-[#795CF6]">PULSE</span>
              </span>
              <span className="block text-[10px] text-slate-400">Smarter Teams. Better Performance.</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Sign in to your account</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your enterprise credentials or use 1-click evaluation shortcuts below.
            </p>
          </div>

          {/* Quick Demo Fill Buttons for Faculty */}
          <div className="p-3.5 rounded-2xl bg-violet-500/5 dark:bg-violet-950/20 border border-violet-500/20 space-y-2">
            <div className="text-[11px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              1-Click Demo Logins for Faculty
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="px-3 py-2 bg-white dark:bg-[#151B30] hover:bg-slate-50 dark:hover:bg-[#1E2540] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                <span className="truncate">Login as Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('employee')}
                className="px-3 py-2 bg-white dark:bg-[#151B30] hover:bg-slate-50 dark:hover:bg-[#1E2540] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span className="truncate">Login as Employee</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-600 dark:text-rose-400">
              {errorMsg}
            </div>
          )}

          {/* Standard Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@workpulse.io"
                  className="w-full bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#795CF6] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-[#795CF6] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#795CF6] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#795CF6] focus:ring-[#795CF6]"
                />
                <span>Remember this device</span>
              </label>

              <span className="text-[11px] text-slate-400">JWT 256-bit SSL</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 text-center text-xs text-slate-400">
            WorkPulse Enterprise • Protected by JWT Token Authorization
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset Password"
        subtitle="We will dispatch authentication tokens to your corporate email."
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          {forgotSuccess ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Reset token dispatched! For demo accounts, use password "admin123" or "employee123".
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@workpulse.io"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl shadow-md"
                >
                  Send Reset Link
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

