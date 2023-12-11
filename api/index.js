import axios, { securedFetchOptions } from './axios';

export const getCatalog = (params) =>
  axios.get('/catalog/view', {
    params,
    ...securedFetchOptions(),
  });

export const createCatalog = (body) =>
  axios.post('/admin/catalog/create', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...securedFetchOptions().headers,
    },
  });

export const login = ({ email, password }) =>
  axios.post('/auth/login', { email, password });

export const getContacts = (params) =>
  axios.get('/admin/contact/view', {
    params,
    ...securedFetchOptions(),
  });
