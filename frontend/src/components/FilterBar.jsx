import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="glass-panel filter-panel">
      {/* Top Row: Search */}
      <div className="filter-row-top">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="input-field search-input"
            placeholder="Search tasks by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Row: Filters and Sorts */}
      <div className="filter-row-bottom">
        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="select-field filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            className="select-field filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-tasks">Sort By</label>
          <select
            id="sort-tasks"
            className="select-field filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueDate">Due Date (Nearest)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
