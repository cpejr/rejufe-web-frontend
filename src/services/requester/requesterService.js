// eslint-disable-next-line no-unused-vars
import qs from 'querystring';
import httpClient from '../../hooks/httpClient';

export const login = (user) => httpClient.post('/login', user);
export const getUserEmailByUsername = (user) => httpClient.get('/usuario/getUserEmailByUsername', {
  params: {
    user,
  },
});

export const sendResetEmail = (email) => httpClient.post('/login/forgotten_password', email);

export const register = (body) => httpClient.post('/usuario', body);

export const registerExternal = (body) => httpClient.post('/usuario/externalAssociateRegister', body);

export const getById = (id) => httpClient.get(`/usuario/${id}`);

export const getAssociates = (times, field, filter) => httpClient.get('/usuario', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const updateUser = (user, userId) => httpClient.put(`/usuario/${userId}`, user);

export const getExcludedAssociate = (status) => httpClient.get('/usuario/getExcludedAssociate', {
  params: {
    status,
  },
});

export const deleteAssociate = (associateId) => httpClient.delete(`usuario/${associateId}`);

export const updateAssociate = (id, body) => httpClient.put(`/usuario/${id}`, body);
