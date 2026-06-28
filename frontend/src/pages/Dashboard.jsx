import React, { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';

const Dashboard = () => {
  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('flowtask-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('flowtask-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // State & CRUD from Custom Hook
  const {
    tasks,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    toasts,
    removeToast,
    deleteConfirmId,
    setDeleteConfirmId,
    currentTaskToEdit,
    setCurrentTaskToEdit,
    createTask,
    updateTask,
    deleteTask,
    stats
  } = useTasks();

  const handleFormSubmit = async (taskData) => {
    if (currentTaskToEdit) {
      return await updateTask(currentTaskToEdit._id, taskData);
    } else {
      return await createTask(taskData);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteTask(deleteConfirmId);
    }
  };

  return (
    <div className="app-container">
      {/* Header bar and stats dashboard */}
      <Header stats={stats} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Workspace Layout */}
      <main className="main-layout">
        {/* Sidebar task controller */}
        <section>
          <TaskForm
            currentTaskToEdit={currentTaskToEdit}
            onSubmitTask={handleFormSubmit}
            onCancelEdit={() => setCurrentTaskToEdit(null)}
            loading={loading}
          />
        </section>

        {/* Primary tasks viewer */}
        <section>
          <FilterBar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setCurrentTaskToEdit}
            onDelete={setDeleteConfirmId}
          />
        </section>
      </main>

      {/* Global Interactive Elements */}
      <DeleteModal
        isOpen={!!deleteConfirmId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Dashboard;
