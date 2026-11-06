import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import {
  initialEmployees,
  initialTasks,
  initialDepartments,
  generateClientAttendance,
  initialNotifications,
} from '../services/mockData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState(initialEmployees);
  const [tasks, setTasks] = useState(initialTasks);
  const [departments, setDepartments] = useState(initialDepartments);
  const [attendance, setAttendance] = useState(generateClientAttendance());
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activities, setActivities] = useState([
    {
      id: 'ACT-901',
      type: 'task_completed',
      title: 'Task Completed: Digital Timer & Active Session Micro-Interactions',
      description: 'Alex Rivera verified the task and passed code review with 0 remarks.',
      actor: { id: 'EMP-101', name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      timestamp: '12m ago',
    },
    {
      id: 'ACT-902',
      type: 'clock_in',
      title: 'Clocked In for Scheduled Work Shift',
      description: 'Sarah Jenkins checked in from Headquarters - San Francisco.',
      actor: { id: 'EMP-102', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
      timestamp: '28m ago',
    },
    {
      id: 'ACT-903',
      type: 'task_created',
      title: 'New High-Priority Task Dispatched',
      description: 'Elena Rostova assigned "Developer Portal Documentation Overhaul" to Hannah Abbott.',
      actor: { id: 'EMP-106', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
      timestamp: '1h ago',
    },
    {
      id: 'ACT-904',
      type: 'report_generated',
      title: 'Monthly Workforce Productivity Report Generated',
      description: 'Automated executive summary published for October 2026 performance cycle.',
      actor: { id: 'SYS-001', name: 'WorkPulse Engine', avatar: null },
      timestamp: '2h ago',
    },
  ]);

  // Live work session state for currently logged in employee
  const [sessionStatus, setSessionStatus] = useState('Working'); // 'Working' | 'On Break' | 'Clocked Out'
  const [secondsElapsed, setSecondsElapsed] = useState(5 * 3600 + 42 * 60 + 15); // e.g., 05:42:15 already today

  // Load from server API with seamless fallback
  const refreshData = useCallback(async () => {
    try {
      const [empRes, taskRes, deptRes, notifRes, actRes] = await Promise.allSettled([
        api.getEmployees(),
        api.getTasks(),
        api.getDepartments(),
        api.getNotifications(user?.role, user?.employeeId),
        api.getActivity(),
      ]);

      if (empRes.status === 'fulfilled' && empRes.value?.employees) {
        setEmployees(empRes.value.employees);
      }
      if (taskRes.status === 'fulfilled' && taskRes.value?.tasks) {
        setTasks(taskRes.value.tasks);
      }
      if (deptRes.status === 'fulfilled' && deptRes.value?.departments) {
        setDepartments(deptRes.value.departments);
      }
      if (notifRes.status === 'fulfilled' && notifRes.value?.notifications) {
        setNotifications(notifRes.value.notifications);
      }
      if (actRes.status === 'fulfilled' && actRes.value?.activities) {
        setActivities(actRes.value.activities);
      }
    } catch (e) {
      console.warn('API sync warning, keeping memory cache active.');
    }
  }, [user]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Timer ticker
  useEffect(() => {
    let interval = null;
    if (sessionStatus === 'Working') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStatus]);

  // --- Clock Controls ---
  const clockIn = async () => {
    setSessionStatus('Working');
    if (user?.employeeId) {
      try {
        await api.clockIn(user.employeeId);
      } catch (e) {}
    }
  };

  const clockOut = async () => {
    setSessionStatus('Clocked Out');
    if (user?.employeeId) {
      try {
        await api.clockOut(user.employeeId);
      } catch (e) {}
    }
  };

  const startBreak = async () => {
    setSessionStatus('On Break');
    if (user?.employeeId) {
      try {
        await api.startBreak(user.employeeId);
      } catch (e) {}
    }
  };

  const endBreak = async () => {
    setSessionStatus('Working');
    if (user?.employeeId) {
      try {
        await api.endBreak(user.employeeId);
      } catch (e) {}
    }
  };

  // --- Employee mutations ---
  const addEmployee = async (empData) => {
    try {
      const res = await api.createEmployee(empData);
      if (res.success && res.employee) {
        setEmployees((prev) => [res.employee, ...prev]);
        return res.employee;
      }
    } catch (e) {}
    // Client fallback
    const newEmp = {
      employeeId: `EMP-${100 + employees.length + 1}`,
      name: empData.name,
      email: empData.email,
      role: empData.role || 'employee',
      designation: empData.designation,
      department: empData.department,
      phone: empData.phone || '+1 (555) 123-4567',
      location: empData.location || 'Headquarters - San Francisco',
      avatar: empData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: empData.status || 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      productivityScore: 90,
      completedTasksCount: 0,
      totalTasksCount: 0,
      onTimeRate: 95,
      weeklyHours: 40.0,
      currentStatus: 'Clocked Out',
    };
    setEmployees((prev) => [newEmp, ...prev]);
    return newEmp;
  };

  const updateEmployee = async (id, data) => {
    try {
      await api.updateEmployee(id, data);
    } catch (e) {}
    setEmployees((prev) => prev.map((e) => (e.employeeId === id ? { ...e, ...data } : e)));
  };

  const deleteEmployee = async (id) => {
    try {
      await api.deleteEmployee(id);
    } catch (e) {}
    setEmployees((prev) => prev.filter((e) => e.employeeId !== id));
  };

  // --- Task mutations ---
  const addTask = async (taskData) => {
    try {
      const res = await api.createTask(taskData);
      if (res.success && res.task) {
        setTasks((prev) => [res.task, ...prev]);
        return res.task;
      }
    } catch (e) {}
    const newTask = {
      id: `TSK-${1000 + tasks.length + 1}`,
      title: taskData.title,
      description: taskData.description || '',
      department: taskData.department,
      assignedTo: taskData.assignedTo,
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'To Do',
      deadline: taskData.deadline || '2026-11-20',
      progress: 0,
      tags: taskData.tags || ['Feature'],
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.updateTaskStatus(taskId, newStatus);
    } catch (e) {}
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              progress: newStatus === 'Completed' ? 100 : t.progress,
            }
          : t
      )
    );
  };

  const updateTask = async (taskId, data) => {
    try {
      await api.updateTask(taskId, data);
    } catch (e) {}
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...data } : t)));
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
    } catch (e) {}
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // --- Notifications ---
  const markNotificationAsRead = async (id) => {
    try {
      await api.markNotificationRead(id);
    } catch (e) {}
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await api.markAllNotificationsRead();
    } catch (e) {}
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider
      value={{
        employees,
        tasks,
        departments,
        attendance,
        notifications,
        activities,
        sessionStatus,
        secondsElapsed,
        clockIn,
        clockOut,
        startBreak,
        endBreak,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addTask,
        updateTaskStatus,
        updateTask,
        deleteTask,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

