import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <AlertTriangle className="modal-warning-icon" size={24} />
          <h2>Delete Task</h2>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to delete this task? This action is permanent and cannot be undone.</p>
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
