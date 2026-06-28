import React from 'react';
import { Inbox } from 'lucide-react';
import TaskCard from './TaskCard';
import Spinner from './Spinner';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return <Spinner />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-panel empty-state">
        <Inbox className="empty-icon" size={48} />
        <h3 className="empty-title">No Tasks Found</h3>
        <p className="empty-subtitle">
          Try adding a new task, searching for something else, or adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
