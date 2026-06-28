import React from 'react';
import { Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/dateFormatter';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColorMap = {
    High: 'var(--color-priority-high)',
    Medium: 'var(--color-priority-medium)',
    Low: 'var(--color-priority-low)',
  };

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <article 
      className="glass-panel task-card"
      style={{ '--priority-color': priorityColorMap[task.priority] || 'var(--text-muted)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
        </div>
        
        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
        
        <div className="task-badges">
          {/* Status Badge */}
          <span className={`badge badge-status-${task.status.toLowerCase().replace(' ', '')}`}>
            {task.status}
          </span>
          
          {/* Priority Badge */}
          <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
            {task.priority} Priority
          </span>
        </div>
      </div>

      <div className="task-footer">
        <div className={`task-due-date ${overdue ? 'overdue' : ''}`}>
          {overdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
          <span>
            {overdue ? 'Overdue: ' : 'Due: '}
            {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="task-actions">
          <button 
            className="icon-btn icon-btn-edit" 
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button 
            className="icon-btn icon-btn-delete" 
            onClick={() => onDelete(task._id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
