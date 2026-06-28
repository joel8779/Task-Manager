/**
 * Format a date string to a human-readable format (e.g., Jun 28, 2026)
 * @param {string|Date} dateVal - Date value to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return 'No due date';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date string to YYYY-MM-DD for HTML date inputs
 * @param {string|Date} dateVal - Date value to format
 * @returns {string} Formatted date string for input
 */
export const formatDateForInput = (dateVal) => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is overdue (in the past, ignoring time)
 * @param {string|Date} dateVal - Date value to check
 * @param {string} status - Task status (completed tasks aren't overdue)
 * @returns {boolean} True if overdue
 */
export const isOverdue = (dateVal, status) => {
  if (!dateVal || status === 'Completed') return false;
  
  const due = new Date(dateVal);
  due.setHours(23, 59, 59, 999); // Allow until end of due day
  
  return due < new Date();
};
