import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const getById = async (id) => {
  const times = 1;
  const response = await requesterService.getById(id, times);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAllUsers = async () => {
  let times = 0;
  let users = [];
  let response;
  do {
    response = await requesterService.getAllUsers(times);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    users = users.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return users;
};

export const getUserEmailByUsername = async (user) => {
  const response = await requesterService.getUserEmailByUsername(user);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const changeUserTypeById = async (typeChange, id) => {
  const response = await requesterService.changeUserTypeById(typeChange, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const register = async (body) => {
  const response = await requesterService.register(body);
  if (response?.data?.notification === 'Email already in use') throw new Error('Email already in use');
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createQuizz = async (body) => {
  const response = await requesterService.createQuizz(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getUsersBySection = async (sections) => {
  let times = 0;
  let users = [];
  let response;
  // eslint-disable-next-line no-restricted-syntax
  for (const section of sections) {
    times = 0;
    do {
      response = await requesterService.getUsersBySection(times, section);
      if (isFailureStatus(response)) throw new Error('Problem with api response');
      users = users.concat(response.data);
      times += 1;
    } while (response.data.length > 0);
  }
  return users;
};

export const registerExternal = async (body) => {
  const response = await requesterService.registerExternal(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const login = async (user) => {
  const response = await requesterService.login(user);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const usuario = response.data.user;
  const fields = Object.keys(usuario).find((field) => field.includes('_id'));
  const id = usuario[fields];
  const userStorage = {
    name: response.data.user.name,
    email: response.data.user.email,
    type: response.data.user.type,
    acessToken: response.data.accessToken,
    id,
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  return response;
};

export const sendResetEmail = async (email) => {
  const response = await requesterService.sendResetEmail(JSON.parse(email));
  if (isFailureStatus(response)) {
    throw new Error('Problem with api response');
  }
  return response;
};

export const getAssociates = async (field, filter) => {
  let times = 0;
  let response;
  let allCandidates = [];
  do {
    response = await requesterService.getAssociates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allCandidates = allCandidates.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allCandidates;
};

export const updateUser = async (user, id) => {
  const response = await requesterService.updateUser(user, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getExcludedAssociate = async (status) => {
  const response = await requesterService.getExcludedAssociate(status);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const deleteAssociate = async (associateId) => {
  const response = await requesterService.deleteAssociate(associateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateAssociate = async (associateId, body) => {
  const response = await requesterService.updateAssociate(associateId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getQuizzes = async (field, filter) => {
  let times = 0;
  let response;

  let allQuizzes = [];
  do {
    response = await requesterService.getQuizzes(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allQuizzes = allQuizzes.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allQuizzes;
};

export const getToVoteQuizzes = async (id, date, field, filter) => {
  let times = 0;
  let response;
  let allQuizzes = [];
  do {
    response = await requesterService.getToVoteQuizzes(id, date, times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allQuizzes = allQuizzes.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allQuizzes;
};

export const updateQuizz = async (id, quizz) => {
  const response = await requesterService.updateQuizz(id, quizz);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getExternalAssociates = async (field, filter) => {
  let times = 0;
  let response;
  let allAssociates = [];
  do {
    response = await requesterService.getExternalAssociates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allAssociates = allAssociates.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allAssociates;
};

export const deleteExternalAssociate = async (associateId) => {
  const response = await requesterService.deleteExternalAssociate(associateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getFileById = async (id) => {
  const response = await requesterService.getFileById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const uploadFile = async (body) => {
  const response = await requesterService.uploadFile(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createNews = async (body) => {
  const response = await requesterService.createNews(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAttempts = async (email) => {
  const response = await requesterService.getAttempts(email);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createComunic = async (body) => {
  const response = await requesterService.createComunic(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getNewsById = async (id) => {
  const response = await requesterService.getNewsById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createAttempt = async (email) => {
  const response = await requesterService.createAttempt(email);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const resetAttempts = async (email) => {
  const response = await requesterService.resetAttempts(email);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateTime = async (email, time) => {
  const response = await requesterService.updateTime(email, time);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getNews = async (field, filter) => {
  let times = 0;
  let response;
  let allNews = [];
  do {
    response = await requesterService.getNews(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allNews = allNews.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allNews;
};

export const createMinutes = async (body) => {
  const response = await requesterService.createMinutes(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getMinutes = async (field, filter) => {
  let times = 0;
  let response;
  let allMinutes = [];
  do {
    response = await requesterService.getMinutes(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allMinutes = allMinutes.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allMinutes;
};

export const getMinutesById = async (id) => {
  const response = await requesterService.getMinutesById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
export const createActions = async (body) => {
  const response = await requesterService.createActions(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
export const createModels = async (body) => {
  const response = await requesterService.createModels(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getFileNameById = async (id) => {
  let response;
  if (id !== undefined && id.length !== 0) {
    response = await requesterService.getFileNameById(id);
    return response.data;
  }
  response = '';
  return response;
};
export const createAccountability = async (body) => {
  const response = await requesterService.createAccountability(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
export const getAccounts = async (field, filter) => {
  let times = 0;
  let response;
  let allActions = [];
  do {
    response = await requesterService.getAccounts(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allActions = allActions.concat(response.data);
    times += 1;
  } while (response.data.length === 0);
  return allActions;
};

export const getInformations = async (field, filter) => {
  let times = 0;
  let response;
  let allInformatives = [];
  do {
    response = await requesterService.getInformations(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allInformatives = allInformatives.concat(response.data);
    times += 1;
  } while (response.data.length === 0);
  return allInformatives;
};

export const getActions = async (field, filter) => {
  let times = 0;
  let response;
  let allActions = [];
  do {
    response = await requesterService.getActions(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allActions = allActions.concat(response.data);
    times += 1;
  } while (response.data.length === 0);
  return allActions;
};

export const download = async (id) => {
  const response = await requesterService.download(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getModels = async (field, filter) => {
  let times = 0;
  let response;
  let allMinutes = [];
  do {
    response = await requesterService.getModels(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allMinutes = allMinutes.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allMinutes;
};
