import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = Info;
        let className = 'toast-info';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          className = 'toast-success';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          className = 'toast-error';
        }

        return (
          <div key={toast.id} className={`toast ${className}`}>
            <Icon size={18} />
            <span>{toast.message}</span>
            <button 
              className="toast-close-btn" 
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
