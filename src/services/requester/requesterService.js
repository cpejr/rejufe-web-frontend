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
