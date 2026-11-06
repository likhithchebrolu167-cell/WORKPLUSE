import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { StatusBadge, DepartmentBadge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useData } from '../context/DataContext';

export const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, tasks, attendance } = useData();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Active record
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [profileTab, setProfileTab] = useState('overview'); // 'overview' | 'tasks' | 'attendance' | 'performance' | 'activity'

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: '',
    phone: '',
    location: 'Headquarters - San Francisco',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  });

  // Filter logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      designation: '',
      phone: '+1 (555) 000-0000',
      location: 'Headquarters - San Francisco',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (emp) => {
    setActiveEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      designation: emp.designation,
      phone: emp.phone || '',
      location: emp.location || 'Headquarters - San Francisco',
      status: emp.status,
      avatar: emp.avatar,
    });
    setShowEditModal(true);
  };

  const handleOpenProfile = (emp) => {
    setActiveEmployee(emp);
    setProfileTab('overview');
    setShowProfileModal(true);
  };

  const handleOpenDelete = (emp) => {
    setActiveEmployee(emp);
    setShowDeleteModal(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) return;
    await addEmployee(formData);
    setShowAddModal(false);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!activeEmployee) return;
    await updateEmployee(activeEmployee.employeeId, formData);
    setShowEditModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!activeEmployee) return;
    await deleteEmployee(activeEmployee.employeeId);
    setShowDeleteModal(false);
  };

  // Associated employee tasks and attendance for profile modal
  const activeEmpTasks = activeEmployee
    ? tasks.filter((t) => t.assignedTo?.id === activeEmployee.employeeId)
    : [];
  const activeEmpAttendance = activeEmployee
    ? attendance.filter((a) => a.employeeId === activeEmployee.employeeId).slice(0, 7)
    : [];

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workforce Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage employee credentials, designations, department assignments, and live productivity.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#795CF6] hover:bg-[#6744E8] text-white rounded-xl text-xs font-semibold shadow-md shadow-violet-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, designation, email, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#101426] text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          />
        </div>

        {/* Filters & View Mode */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-slate-50 dark:bg-[#101426] text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Product Management">Product Management</option>
            <option value="Enterprise Sales">Enterprise Sales</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-[#101426] text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Remote">Remote</option>
            <option value="On Leave">On Leave</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#101426] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#795CF6] text-white' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-[#795CF6] text-white' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Employee List: Grid Mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.employeeId}
              className="group bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Status, Action */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-xl object-cover border border-violet-500/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#795CF6] transition-colors">
                        {emp.name}
                      </h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{emp.designation}</div>
                      <div className="text-[10px] font-mono font-medium text-slate-400 mt-0.5">{emp.employeeId}</div>
                    </div>
                  </div>

                  <StatusBadge status={emp.status} />
                </div>

                {/* Badges & Meta */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <DepartmentBadge department={emp.department} />
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {emp.joinDate}
                  </span>
                </div>

                {/* Productivity Meter */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Productivity Index</span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">{emp.productivityScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                      style={{ width: `${emp.productivityScore}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{emp.completedTasksCount} Tasks Completed</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{emp.onTimeRate}% on-time</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleOpenProfile(emp)}
                  className="text-xs font-semibold text-[#795CF6] hover:text-[#6744E8] flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Profile
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(emp)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Employee"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(emp)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete Employee"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Employee List: Table Mode */
        <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#101426] border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Productivity</th>
                  <th className="py-3 px-4">On-Time Rate</th>
                  <th className="py-3 px-4">Weekly Hours</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.employeeId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{emp.name}</div>
                          <div className="text-[11px] text-slate-400">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <DepartmentBadge department={emp.department} />
                      <div className="text-[11px] text-slate-400 mt-0.5">{emp.designation}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-violet-600 dark:text-violet-400">{emp.productivityScore}%</span>
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full"
                            style={{ width: `${emp.productivityScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{emp.onTimeRate}%</td>
                    <td className="py-3.5 px-4">{emp.weeklyHours}h / wk</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenProfile(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Onboard New Employee"
        subtitle="Add a new workforce member to the WorkPulse system."
      >
        <form onSubmit={handleSubmitAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
              <input
                type="email"
                required
                placeholder="maya.lin@workpulse.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Product Management">Product Management</option>
                <option value="Enterprise Sales">Enterprise Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                required
                placeholder="e.g. Cloud Security Specialist"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Location</label>
              <input
                type="text"
                placeholder="Headquarters or Remote - City"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl shadow-md shadow-violet-500/20"
            >
              Confirm Onboarding
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Employee Credentials"
        subtitle={`Updating profile records for ${activeEmployee?.name}`}
      >
        <form onSubmit={handleSubmitEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Product Management">Product Management</option>
                <option value="Enterprise Sales">Enterprise Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="Active">Active</option>
                <option value="Remote">Remote</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="De-register Employee"
        subtitle="This action will remove the employee from active workforce rosters."
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to permanently remove <strong>{activeEmployee?.name}</strong> ({activeEmployee?.designation})?
            All completed historical work logs will remain archived.
          </p>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Yes, Remove Record
            </button>
          </div>
        </div>
      </Modal>

      {/* Deep Employee Profile Modal with 5 Tabs */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title={activeEmployee?.name || 'Employee Profile'}
        subtitle={`${activeEmployee?.designation} • ${activeEmployee?.department}`}
        maxWidth="max-w-2xl"
      >
        {activeEmployee && (
          <div className="space-y-5">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'tasks', label: `Tasks (${activeEmpTasks.length})` },
                { id: 'attendance', label: 'Attendance' },
                { id: 'performance', label: 'Performance' },
                { id: 'activity', label: 'Activity History' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProfileTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    profileTab === tab.id
                      ? 'bg-[#795CF6] text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {profileTab === 'overview' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-100 dark:border-slate-800">
                  <img
                    src={activeEmployee.avatar}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/30"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{activeEmployee.name}</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{activeEmployee.designation}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <DepartmentBadge department={activeEmployee.department} />
                      <StatusBadge status={activeEmployee.status} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Productivity</span>
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      {activeEmployee.productivityScore}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">On-Time Rate</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {activeEmployee.onTimeRate}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426]">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Weekly Hours</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {activeEmployee.weeklyHours}h
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-violet-500" />
                    <span>{activeEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-violet-500" />
                    <span>{activeEmployee.phone || '+1 (555) 234-5678'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-violet-500" />
                    <span>{activeEmployee.location || 'Headquarters - San Francisco'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Assigned Tasks */}
            {profileTab === 'tasks' && (
              <div className="space-y-3">
                {activeEmpTasks.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">No active tasks currently assigned.</div>
                ) : (
                  activeEmpTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{t.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Due: {t.deadline}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={t.status} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Attendance Records */}
            {profileTab === 'attendance' && (
              <div className="space-y-2">
                <div className="text-xs text-slate-500 mb-2">Recent 7 work session logs:</div>
                {activeEmpAttendance.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{rec.date}</span>
                      <span className="text-[11px] text-slate-400 ml-2">
                        {rec.clockIn} - {rec.clockOut || 'Active'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{rec.workingHours}h</span>
                      <StatusBadge status={rec.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Performance */}
            {profileTab === 'performance' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40">
                  <div className="font-bold text-violet-900 dark:text-violet-200 text-sm mb-1">
                    Performance Evaluation Index: {activeEmployee.productivityScore}%
                  </div>
                  <p className="text-violet-700 dark:text-violet-300 text-xs">
                    Evaluated against sprint deliverables, peer reviews, code reviews, and deadline adherence.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Task Completion Rate</span>
                      <span>96%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>On-Time Milestone Velocity</span>
                      <span>{activeEmployee.onTimeRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeEmployee.onTimeRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Activity History */}
            {profileTab === 'activity' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                  <span>Joined WorkPulse Organization</span>
                  <span className="text-slate-400">{activeEmployee.joinDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                  <span>Assigned to {activeEmployee.department} team</span>
                  <span className="text-slate-400">Verified</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101426] flex items-center justify-between">
                  <span>Q3 Performance Review Completed</span>
                  <span className="text-emerald-500 font-bold">Passed (Exceeds SLA)</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

