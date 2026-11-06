import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Tag,
  User,
} from 'lucide-react';
import { PriorityBadge, DepartmentBadge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useData } from '../context/DataContext';

export const Tasks = () => {
  const { tasks, addTask, updateTaskStatus, updateTask, deleteTask, employees } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'Engineering',
    priority: 'Medium',
    status: 'To Do',
    deadline: '2026-11-20',
    assignedToId: 'EMP-101',
    tags: 'Feature, Sprint',
  });

  const columns = [
    { id: 'To Do', title: 'To Do', color: 'border-amber-500/40 text-amber-500' },
    { id: 'In Progress', title: 'In Progress', color: 'border-violet-500/40 text-violet-500' },
    { id: 'Review', title: 'Review', color: 'border-blue-500/40 text-blue-500' },
    { id: 'Completed', title: 'Completed', color: 'border-emerald-500/40 text-emerald-500' },
  ];

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    const matchesPri = selectedPriority === 'All' || t.priority === selectedPriority;
    return matchesSearch && matchesDept && matchesPri;
  });

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      description: '',
      department: 'Engineering',
      priority: 'Medium',
      status: 'To Do',
      deadline: '2026-11-20',
      assignedToId: employees[0]?.employeeId || 'EMP-101',
      tags: 'Feature, Sprint',
    });
    setShowCreateModal(true);
  };

  const handleOpenEdit = (task) => {
    setActiveTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      department: task.department,
      priority: task.priority,
      status: task.status,
      deadline: task.deadline,
      assignedToId: task.assignedTo?.id || 'EMP-101',
      tags: task.tags?.join(', ') || 'Feature',
    });
    setShowEditModal(true);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const assignee = employees.find((emp) => emp.employeeId === formData.assignedToId) || {
      employeeId: 'EMP-101',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      designation: 'Senior Frontend Engineer',
    };

    await addTask({
      title: formData.title,
      description: formData.description,
      department: formData.department,
      priority: formData.priority,
      status: formData.status,
      deadline: formData.deadline,
      assignedTo: {
        id: assignee.employeeId,
        name: assignee.name,
        avatar: assignee.avatar,
        designation: assignee.designation,
      },
      tags: formData.tags.split(',').map((s) => s.trim()),
    });

    setShowCreateModal(false);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!activeTask) return;

    const assignee = employees.find((emp) => emp.employeeId === formData.assignedToId);

    await updateTask(activeTask.id, {
      title: formData.title,
      description: formData.description,
      department: formData.department,
      priority: formData.priority,
      status: formData.status,
      deadline: formData.deadline,
      ...(assignee
        ? {
            assignedTo: {
              id: assignee.employeeId,
              name: assignee.name,
              avatar: assignee.avatar,
              designation: assignee.designation,
            },
          }
        : {}),
      tags: formData.tags.split(',').map((s) => s.trim()),
    });

    setShowEditModal(false);
  };

  // Move task across columns
  const moveTask = (taskId, currentStatus, direction) => {
    const colOrder = ['To Do', 'In Progress', 'Review', 'Completed'];
    const currentIndex = colOrder.indexOf(currentStatus);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < colOrder.length) {
      updateTaskStatus(taskId, colOrder[newIndex]);
    }
  };

  // Drag and Drop HTML5 handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      updateTaskStatus(taskId, targetStatus);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Task Management Board</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Linear-style Kanban interface for workforce sprint deliverables, tracking velocity and milestone SLAs.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#795CF6] hover:bg-[#6744E8] text-white rounded-xl text-xs font-semibold shadow-md shadow-violet-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deliverables by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#101426] text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-50 dark:bg-[#101426] text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Product Management">Product Management</option>
            <option value="Enterprise Sales">Enterprise Sales</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 dark:bg-[#101426] text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="bg-slate-50/70 dark:bg-[#101426]/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full border-2 ${col.color}`} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{col.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-[#151B30] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    Drop items here
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="group bg-white dark:bg-[#151B30] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-premium hover:border-violet-500/40 transition-all cursor-grab active:cursor-grabbing"
                    >
                      {/* Priority & Department */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <PriorityBadge priority={task.priority} />
                        <DepartmentBadge department={task.department} />
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#795CF6] transition-colors">
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Assignee & Deadline */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.assignedTo?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                            alt={task.assignedTo?.name}
                            title={task.assignedTo?.name}
                            className="w-6 h-6 rounded-full object-cover border border-violet-500/30"
                          />
                          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate max-w-[90px]">
                            {task.assignedTo?.name?.split(' ')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{task.deadline?.slice(5)}</span>
                        </div>
                      </div>

                      {/* Quick Column Transition Arrows & Controls */}
                      <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1">
                          {col.id !== 'To Do' && (
                            <button
                              onClick={() => moveTask(task.id, task.status, 'prev')}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                              title="Move back"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.id !== 'Completed' && (
                            <button
                              onClick={() => moveTask(task.id, task.status, 'next')}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                              title="Move forward"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(task)}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            title="Edit task"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-500"
                            title="Delete task"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Deliverable Task"
        subtitle="Dispatch a new sprint item into the workforce Kanban stream."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement Microservices Observability Pipeline"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Detailed criteria, acceptance standards, and telemetry..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#795CF6]"
            />
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Employee</label>
              <select
                value={formData.assignedToId}
                onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                {employees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Column</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Milestone Deadline</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#795CF6] hover:bg-[#6744E8] text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Deliverable Details"
        subtitle={`Updating task ${activeTask?.id}`}
      >
        <form onSubmit={handleUpdateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#101426] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
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
    </div>
  );
};

