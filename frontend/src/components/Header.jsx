import React from 'react';
import { Sun, Moon, ClipboardList, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Header = ({ stats, theme, toggleTheme }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header className="glass-panel header-wrapper">
        <div className="brand-section">
          <div className="brand-logo">
            <ClipboardList size={22} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Task Manager</h1>
            <p className="brand-subtitle">Organize and manage your daily workflow</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Stats Board */}
      <section className="stats-container">
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper">
            <ClipboardList size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper">
            <AlertCircle size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper">
            <Clock size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper">
            <CheckCircle size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
