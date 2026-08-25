import axios from 'axios';

// Confirmed via Swagger "Try it out": the real base path includes /api
// (not shown in the route list itself, but present in the executed request).
export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};
