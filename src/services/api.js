import axios from 'axios';

// Backend: https://vocab-builder-backend.p.goit.global/api-docs/
export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global',
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};
