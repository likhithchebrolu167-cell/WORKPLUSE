// WorkPulse API Client Service with transparent fallback

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('workpulse_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, using client-side auth fallback');
      if (email === 'admin@workpulse.io') {
        return {
          success: true,
          token: 'mock-admin-token',
          user: {
            id: 'USR-001',
            name: 'Sarah Jenkins',
            email: 'admin@workpulse.io',
            role: 'admin',
            employeeId: 'EMP-102',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
            department: 'Product Management',
            designation: 'VP of Operations & Talent',
          },
        };
      } else {
        return {
          success: true,
          token: 'mock-employee-token',
          user: {
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
      }
    }
  },

  getMe: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      return await res.json();
    } catch (e) {
      return { success: false };
    }
  },

  // Employees
  getEmployees: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/employees?${query}`, { headers: getHeaders() });
    return await res.json();
  },

  getEmployee: async (id) => {
    const res = await fetch(`${API_BASE}/employees/${id}`, { headers: getHeaders() });
    return await res.json();
  },

  createEmployee: async (data) => {
    const res = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  updateEmployee: async (id, data) => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteEmployee: async (id) => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return await res.json();
  },

  // Departments
  getDepartments: async () => {
    const res = await fetch(`${API_BASE}/departments`, { headers: getHeaders() });
    return await res.json();
  },

  // Tasks
  getTasks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/tasks?${query}`, { headers: getHeaders() });
    return await res.json();
  },

  createTask: async (data) => {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  updateTaskStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  updateTask: async (id, data) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteTask: async (id) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return await res.json();
  },

  // Attendance
  getAttendance: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/attendance?${query}`, { headers: getHeaders() });
    return await res.json();
  },

  getTodayAttendance: async (employeeId) => {
    const res = await fetch(`${API_BASE}/attendance/today/${employeeId}`, { headers: getHeaders() });
    return await res.json();
  },

  clockIn: async (employeeId) => {
    const res = await fetch(`${API_BASE}/attendance/clock-in`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ employeeId }),
    });
    return await res.json();
  },

  clockOut: async (employeeId) => {
    const res = await fetch(`${API_BASE}/attendance/clock-out`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ employeeId }),
    });
    return await res.json();
  },

  startBreak: async (employeeId) => {
    const res = await fetch(`${API_BASE}/attendance/break-start`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ employeeId }),
    });
    return await res.json();
  },

  endBreak: async (employeeId) => {
    const res = await fetch(`${API_BASE}/attendance/break-end`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ employeeId }),
    });
    return await res.json();
  },

  // Analytics
  getDashboardAnalytics: async () => {
    const res = await fetch(`${API_BASE}/analytics/dashboard`, { headers: getHeaders() });
    return await res.json();
  },

  getHeatmap: async () => {
    const res = await fetch(`${API_BASE}/analytics/heatmap`, { headers: getHeaders() });
    return await res.json();
  },

  getActivity: async () => {
    const res = await fetch(`${API_BASE}/analytics/activity`, { headers: getHeaders() });
    return await res.json();
  },

  // Reports
  getReports: async (type = 'monthly', department = '') => {
    const query = new URLSearchParams({ type, ...(department ? { department } : {}) }).toString();
    const res = await fetch(`${API_BASE}/reports?${query}`, { headers: getHeaders() });
    return await res.json();
  },

  // Notifications
  getNotifications: async (role = 'all', employeeId = null) => {
    const query = new URLSearchParams({ role, ...(employeeId ? { employeeId } : {}) }).toString();
    const res = await fetch(`${API_BASE}/notifications?${query}`, { headers: getHeaders() });
    return await res.json();
  },

  markNotificationRead: async (id) => {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return await res.json();
  },

  markAllNotificationsRead: async () => {
    const res = await fetch(`${API_BASE}/notifications/mark-all-read`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return await res.json();
  },
};

