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

export const getQuizzes = (times, field, filter) => httpClient.get('/quizzes', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getToVoteQuizzes = (id, date, times, field, filter) => httpClient.get(`/quizzes/toVote/${id}`, {
  params: {
    date,
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const updateQuizz = (id, quizz) => httpClient.put(`/quizzes/vote/${id}`, quizz);

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

export const getAttempts = (email) => httpClient.get('/attempts/getAttemptsByEmail', {
  params: {
    email,
  },
});

export const createAttempt = (field) => httpClient.post('/attempts', field);

export const resetAttempts = (email) => httpClient.put('/attempts/resetByEmail', {
  params: {
    email,
  },
});

export const updateTime = (email, time) => httpClient.put('/attempts/updateTime', {
  params: {
    email,
    time,
  },
});

export const createComunic = (body) => httpClient.post('/informacoes', body);

export const getNewsById = (id) => httpClient.get(`/noticias/${id}`);

export const getNews = (times, field, filter) => httpClient.get('/noticias', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),

});
export const getActions = (times, field, filter) => httpClient.get('/acoes', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});
export const deleteAction = (actionId) => httpClient.delete(`/acoes/${actionId}`);

export const updateAction = (actionId, body) => httpClient.put(`/acoes/${actionId}`, body);

export const getImageById = (id) => httpClient.get(`/arquivos/image/${id}`);

export const download = (id) => httpClient.get(`/arquivos/${id}`, {
  responseType: 'blob',
});

export const createActions = (body) => httpClient.post('/acoes', body);

export const getFileNameById = (archiveId) => httpClient.get('/arquivos/getFileNameById/', {
  params: {
    archiveId,
  },
});
