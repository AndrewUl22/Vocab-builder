import axios from 'axios';

// backend base url needs the /api prefix, found this out from the
// curl output in Swagger, it is not shown in the route list itself
export const instance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};
