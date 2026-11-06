import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

const DEMO_ACCOUNTS = {
  admin: {
    id: 'USR-001',
    name: 'Sarah Jenkins',
    email: 'admin@workpulse.io',
    role: 'admin',
    employeeId: 'EMP-102',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Product Management',
    designation: 'VP of Operations & Talent',
  },
  employee: {
    id: 'USR-002',
    name: 'Alex Rivera',
    email: 'alex.rivera@workpulse.io',
    role: 'employee',
    employeeId: 'EMP-101',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    designation: 'Senior Frontend Engineer',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('workpulse_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_ACCOUNTS.admin;
      }
    }
    return DEMO_ACCOUNTS.admin; // Default demo login as Admin for instant faculty preview
  });

  const [token, setToken] = useState(() => localStorage.getItem('workpulse_token') || 'demo-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('workpulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('workpulse_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      if (res.success && res.user) {
        setUser(res.user);
        setToken(res.token || 'jwt-active');
        localStorage.setItem('workpulse_token', res.token || 'jwt-active');
        localStorage.setItem('workpulse_user', JSON.stringify(res.user));
        return { success: true };
      } else {
        return { success: false, message: res.message || 'Authentication failed' };
      }
    } catch (e) {
      return { success: false, message: 'Server communication error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('workpulse_user');
    localStorage.removeItem('workpulse_token');
  };

  // Instant demo role switch for faculty demonstration
  const switchDemoUser = (targetRole) => {
    const nextUser = targetRole === 'admin' ? DEMO_ACCOUNTS.admin : DEMO_ACCOUNTS.employee;
    setUser(nextUser);
    localStorage.setItem('workpulse_user', JSON.stringify(nextUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin: user?.role === 'admin',
        isEmployee: user?.role === 'employee',
        login,
        logout,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

