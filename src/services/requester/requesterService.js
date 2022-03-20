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

export const createQuizz = (body) => httpClient.post('/quizzes', body);

export const registerExternal = (body) => httpClient.post('/usuario/externalAssociateRegister', body);

export const getById = (id, times) => httpClient.get(`/usuario/${id}`, {
  params: {
    times,
  },
});

export const getAllUsers = (times) => httpClient.get('/usuario/', {
  params: {
    times,
  },
});

export const getUsersBySection = (times, section) => httpClient.get(`/usuario/section/${section}`, {
  params: {
    times,
  },
});

export const getQuizzes = (times, field, filter) => httpClient.get('/quizzes', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const changeUserTypeById = (typeChange, id) => httpClient.put(`/usuario/${id}`, typeChange);

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

export const getExternalAssociates = (times, field, filter) => httpClient.get('/usuario/externalAssociate', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const deleteExternalAssociate = (associateId) => httpClient.delete(`usuario/externalAssociate/${associateId}`);

export const getFileById = (id) => httpClient.get(`/arquivo/${id}`);

export const uploadFile = (body) => httpClient.post('/arquivos', body);

export const createNews = (body) => httpClient.post('/noticias', body);

export const createComunic = (body) => httpClient.post('/informacoes', body);
