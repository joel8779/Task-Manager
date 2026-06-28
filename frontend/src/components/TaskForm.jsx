import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { formatDateForInput } from '../utils/dateFormatter';

const TaskForm = ({ currentTaskToEdit, onSubmitTask, onCancelEdit, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Populate form fields if we are in edit mode
  useEffect(() => {
    if (currentTaskToEdit) {
      setTitle(currentTaskToEdit.title || '');
      setDescription(currentTaskToEdit.description || '');
      setStatus(currentTaskToEdit.status || 'Pending');
      setPriority(currentTaskToEdit.priority || 'Medium');
      setDueDate(formatDateForInput(currentTaskToEdit.dueDate) || '');
      setErrors({});
    } else {
      resetForm();
    }
  }, [currentTaskToEdit]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setPriority('Medium');
    setDueDate('');
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (description && description.trim().length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || null
    };

    const success = await onSubmitTask(taskData);
    if (success && !currentTaskToEdit) {
      resetForm();
    }
  };

  return (
    <form className="glass-panel form-panel" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {currentTaskToEdit ? 'Edit Task' : 'Create Task'}
      </h2>

      {/* Title Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="task-title">Title *</label>
        <input
          id="task-title"
          type="text"
          className="input-field"
          placeholder="e.g. Write documentation"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        {errors.title && <span style={{ color: 'var(--color-high)', fontSize: '0.85rem', fontWeight: 500 }}>{errors.title}</span>}
      </div>

      {/* Description Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="task-desc">Description</label>
        <textarea
          id="task-desc"
          className="textarea-field"
          placeholder="Enter details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        {errors.description && <span style={{ color: 'var(--color-high)', fontSize: '0.85rem', fontWeight: 500 }}>{errors.description}</span>}
      </div>

      {/* Status & Priority Row */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="select-field"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="select-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={loading}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due Date Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          className="input-field"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Form Buttons */}
      <div className="form-actions">
        {currentTaskToEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
            disabled={loading}
          >
            <X size={18} /> Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            'Saving...'
          ) : currentTaskToEdit ? (
            <>
              <Save size={18} /> Save Changes
            </>
          ) : (
            <>
              <Plus size={18} /> Create Task
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
