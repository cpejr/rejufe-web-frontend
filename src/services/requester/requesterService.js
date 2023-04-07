// eslint-disable-next-line no-unused-vars
import qs from 'qs';
import httpClient from '../../hooks/httpClient';

export const login = (user) => httpClient.post('/login', user);

export const getUserEmailByUsername = (user) => httpClient.get('/usuario/getUserEmailByUsername', {
  params: {
    user,
  },
});

export const getUserEmailByCpf = (cpf) => httpClient.get('/usuario/getUserEmailByCpf', {
  params: {
    cpf,
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

export const getUsersByAllocation = (times, allocation) => httpClient.get(`/usuario/allocation/${allocation}`, {
  params: {
    times,
  },
});

export const changeUserTypeById = (typeChange, id) => httpClient.put(`/usuario/${id}`, typeChange);

export const contactUs = (body) => httpClient.post('/faleConosco', body);

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

export const getQuizzes = (date, times, field, filter) => httpClient.get('/quizzes', {
  params: {
    date,
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

export const updateVotes = (quizzId, body) => httpClient.put(`/quizzes/votes/${quizzId}`, body);

export const getExternalAssociates = (times, field, filter) => httpClient.get('/usuario/externalAssociate', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const deleteExternalAssociate = (associateId) => httpClient.delete(`usuario/externalAssociate/${associateId}`);

export const getFileById = (id) => httpClient.get(`/arquivos/${id}`);

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
export const deleteAction = (actionId) => httpClient.delete(`/acoes/${actionId}`);

export const updateRecord = (id, body) => httpClient.put(`/noticias/${id}`, body);

export const getComunic = (times, field, filter) => httpClient.get('/informacoes', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const createMinutes = (body) => httpClient.post('/atas', body);

export const getMinutes = (times, field, filter) => httpClient.get('/atas', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const deleteComunic = (comunicId) => httpClient.delete(`/informacoes/${comunicId}`);

export const updateComunic = (comunicId, body) => httpClient.put(`/informacoes/${comunicId}`, body);

export const download = (id) => httpClient.get(`/arquivos/${id}`, {
  responseType: 'blob',
});
export const getMinutesById = (minutesId) => httpClient.get(`/atas/${minutesId}`);

export const createAccountability = (body) => httpClient.post('/prestacaodecontas', body);

export const updateAction = (actionId, body) => httpClient.put(`/acoes/${actionId}`, body);

export const createActions = (body) => httpClient.post('/acoes', body);

export const getMinute = (times, field, filter) => httpClient.get('/atas', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});
export const createModels = (body) => httpClient.post('/modelos', body);

export const getModels = (times, field, filter) => httpClient.get('/modelos', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getEdicts = (times, field, filter) => httpClient.get('/atas', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getInformations = (times, field, filter) => httpClient.get('/informacoes', {
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

export const deleteAccount = (actionId) => httpClient.delete(`/prestacaodecontas/${actionId}`);

export const updateAccount = (actionId, body) => httpClient.put(`/prestacaodecontas/${actionId}`, body);

export const deleteMinute = (minuteId) => httpClient.delete(`/atas/${minuteId}`);

export const updateMinute = (minuteId, body) => httpClient.put(`/atas/${minuteId}`, body);
export const deleteModel = (modelId) => httpClient.delete(`modelos/${modelId}`);

export const updateModel = (id, model) => httpClient.put(`modelos/${id}`, model);

export const getFileNameById = (archiveId) => httpClient.get('/arquivos/getFileNameById', {
  params: {
    archiveId,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getCommunique = (times, field, filter) => httpClient.get('/informacoes', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getAccounts = (times, field, filter) => httpClient.get('/prestacaodecontas', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getImageById = (id) => httpClient.get(`/arquivos/image/${id}`);

export const sendBirthdayEmail = () => httpClient.post('/birthday');

export const getTodayBirthday = (times, field, filter) => httpClient.get('usuario/getUsersByTodaysBirthday', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getExternalUserById = (associateId) => httpClient.get(`usuario/externalAssociate/${associateId}`);
