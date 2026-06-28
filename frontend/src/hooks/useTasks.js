import { useState, useEffect, useMemo } from 'react';
import { 
  getTasksAPI, 
  createTaskAPI, 
  updateTaskAPI, 
  deleteTaskAPI 
} from '../services/api';

export const useTasks = () => {
  // Main states
  const [tasks, setTasks] = useState([]);
  const [allTasksRaw, setAllTasksRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters, search, sorting
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Interactive UI States
  const [toasts, setToasts] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState(null);

  // Debounce search input to avoid hitting backend on every keypress
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch tasks from server
  const fetchTasks = async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) setLoading(true);
    setError(null);
    try {
      const params = {};
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;
      params.sortBy = sortBy;

      // 1. Fetch filtered tasks
      const resFiltered = await getTasksAPI(params);
      if (resFiltered.data && resFiltered.data.status === 'success') {
        setTasks(resFiltered.data.data.tasks);
      }

      // 2. Fetch all raw tasks for dashboard stats (no filters)
      const resAll = await getTasksAPI({});
      if (resAll.data && resAll.data.status === 'success') {
        setAllTasksRaw(resAll.data.data.tasks);
      }
    } catch (err) {
      console.error('API Error:', err);
      const errMsg = err.response?.data?.message || 'Failed to connect to server';
      setError(errMsg);
      addToast(errMsg, 'error');
    } finally {
      if (showLoadingSpinner) setLoading(false);
    }
  };

  // Trigger fetch when query parameters change
  useEffect(() => {
    fetchTasks();
  }, [debouncedSearch, statusFilter, priorityFilter, sortBy]);

  // CRUD Operations communicating with Backend
  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createTaskAPI(taskData);
      if (response.data && response.data.status === 'success') {
        addToast('Task created successfully!', 'success');
        // Refetch list immediately to show new task with correct sorting/filters
        await fetchTasks(false);
        return true;
      }
      return false;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Validation failed or connection error';
      setError(errMsg);
      addToast(errMsg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateTaskAPI(id, taskData);
      if (response.data && response.data.status === 'success') {
        addToast('Task updated successfully!', 'success');
        await fetchTasks(false);
        setCurrentTaskToEdit(null);
        return true;
      }
      return false;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Validation failed or connection error';
      setError(errMsg);
      addToast(errMsg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteTaskAPI(id);
      if (response.data && response.data.status === 'success') {
        addToast('Task deleted successfully!', 'success');
        await fetchTasks(false);
        setDeleteConfirmId(null);
        return true;
      }
      return false;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to delete task';
      setError(errMsg);
      addToast(errMsg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Statistics calculation based on raw allTasks list (unfiltered)
  const stats = useMemo(() => {
    const total = allTasksRaw.length;
    const completed = allTasksRaw.filter((t) => t.status === 'Completed').length;
    const inProgress = allTasksRaw.filter((t) => t.status === 'In Progress').length;
    const pending = allTasksRaw.filter((t) => t.status === 'Pending').length;

    return { total, completed, inProgress, pending };
  }, [allTasksRaw]);

  return {
    tasks,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    toasts,
    addToast,
    removeToast,
    deleteConfirmId,
    setDeleteConfirmId,
    currentTaskToEdit,
    setCurrentTaskToEdit,
    createTask,
    updateTask,
    deleteTask,
    stats
  };
};
