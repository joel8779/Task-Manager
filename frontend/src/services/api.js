import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasksAPI = (params) => api.get('/tasks', { params });
export const getTaskAPI = (id) => api.get(`/tasks/${id}`);
export const createTaskAPI = (taskData) => api.post('/tasks', taskData);
export const updateTaskAPI = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTaskAPI = (id) => api.delete(`/tasks/${id}`);

export default api;
