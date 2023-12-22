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

export const updateCatalog = (body) =>
  axios.patch('/admin/catalog/update', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...securedFetchOptions().headers,
    },
  });
export const deleteCatalog = (id) =>
  axios.delete(`/admin/catalog/?catalog_id=${id}`, securedFetchOptions());

export const login = ({ email, password }) =>
  axios.post('/auth/login', { email, password });

export const getContacts = (params) =>
  axios.get('/admin/contact/view', {
    params,
    ...securedFetchOptions(),
  });

export const updateContact = (id, isView) =>
  axios.post(
    '/admin/contact/change-view',
    { contact_id: id, is_view: isView },
    securedFetchOptions()
  );

export const getOrders = (params) =>
  axios.get('/admin/order/view', {
    params,
    ...securedFetchOptions(),
  });

export const updateOrder = ({ id, status, ttn }) =>
  axios.patch(
    '/admin/order/edit',
    {
      payment_id: id,
      ttn,
      status,
    },
    securedFetchOptions()
  );

export const getUsers = (params) =>
  axios.get('/admin/users/view', {
    params,
    ...securedFetchOptions(),
  });

export const updateUser = ({ id, full_name }) =>
  axios.patch(
    '/admin/users/edit',
    { full_name, account_id: id },
    securedFetchOptions()
  );

export const deleteUser = (id) =>
  axios.delete(`/admin/users/delete?account_id=${id}`, securedFetchOptions());
