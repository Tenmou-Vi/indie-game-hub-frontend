import axios from 'axios';

// 配置 axios 基础 URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://indie-game-hub-backend-346389979835.us-central1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ===== TASKS API =====

export const tasksAPI = {
  // 获取所有任务
  getAll: async () => {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  // 获取单个任务
  getById: async (id) => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },

  // 创建新任务
  create: async (taskData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  },

  // 更新任务
  update: async (id, taskData) => {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data;
  },

  // 删除任务
  delete: async (id) => {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  },
};

// ===== ASSETS API =====

export const assetsAPI = {
  // 获取所有资源
  getAll: async () => {
    const response = await api.get('/api/assets');
    return response.data;
  },

  // 获取单个资源
  getById: async (id) => {
    const response = await api.get(`/api/assets/${id}`);
    return response.data;
  },

  // 创建新资源
  create: async (assetData) => {
    const response = await api.post('/api/assets', assetData);
    return response.data;
  },

  // 更新资源
  update: async (id, assetData) => {
    const response = await api.put(`/api/assets/${id}`, assetData);
    return response.data;
  },

  // 删除资源
  delete: async (id) => {
    const response = await api.delete(`/api/assets/${id}`);
    return response.data;
  },
};

// ===== USERS API =====

export const usersAPI = {
  // 获取所有用户
  getAll: async () => {
    const response = await api.get('/api/users');
    return response.data;
  },
};

// ===== VERSIONS API =====

export const versionsAPI = {
  // 获取所有版本
  getAll: async () => {
    const response = await api.get('/api/versions');
    return response.data;
  },
};

// ===== HEALTH CHECK =====

export const healthAPI = {
  // 健康检查
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
