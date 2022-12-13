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

export const getUserEmailByCpf = async (cpf) => {
  const response = await requesterService.getUserEmailByCpf(cpf);
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
  if (response?.data?.notification === 'CPF already in use') throw new Error('CPF already in use');
  if (response?.data?.notification === 'User already in use') throw new Error('User already in use');
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
    rememberMe: user.rememberMe,
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  sessionStorage.setItem('@token', response.data.accessToken);
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

export const getQuizzes = async (date, field, filter) => {
  let times = 0;
  let response;

  let allQuizzes = [];
  do {
    response = await requesterService.getQuizzes(date, times, field, filter);
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

export const updateRecord = async (record, id) => {
  const response = await requesterService.updateRecord(record, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getComunic = async (field, filter) => {
  let times = 0;
  let response;
  let allComunic = [];
  do {
    response = await requesterService.getComunic(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allComunic = allComunic.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allComunic;
};

export const deleteComunic = async (comunicId) => {
  const response = await requesterService.deleteComunic(comunicId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateComunic = async (comunicId, body) => {
  const response = await requesterService.updateComunic(comunicId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
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

export const getMinute = async (field, filter) => {
  let times = 0;
  let response;
  let allComunic = [];
  do {
    response = await requesterService.getMinute(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allComunic = allComunic.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allComunic;
};

export const deleteMinute = async (minuteId) => {
  const response = await requesterService.deleteMinute(minuteId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateMinute = async (minuteId, body) => {
  const response = await requesterService.updateMinute(minuteId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createModels = async (body) => {
  const response = await requesterService.createModels(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getModels = async (field, filter) => {
  let times = 0;
  let response;
  let allModels = [];
  do {
    response = await requesterService.getModels(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allModels = allModels.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allModels;
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
export const getEdicts = async (field, filter) => {
  let times = 0;
  let response;
  let allEdicts = [];
  do {
    response = await requesterService.getEdicts(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allEdicts = allEdicts.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allEdicts;
};

export const deleteModel = async (modelId) => {
  const response = await requesterService.deleteModel(modelId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateModel = async (id, model) => {
  const response = await requesterService.updateModel(id, model);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
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
  } while (response.data.length > 0);
  return allActions;
};

export const getAccounts = async (field, filter) => {
  let times = 0;
  let response;
  let allAccounts = [];
  do {
    response = await requesterService.getAccounts(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allAccounts = allAccounts.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allAccounts;
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

export const getCommunique = async (field, filter) => {
  let times = 0;
  let response;
  let allCommunique = [];
  do {
    response = await requesterService.getCommunique(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allCommunique = allCommunique.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allCommunique;
};

export const contactUs = async (body) => {
  const response = await requesterService.contactUs(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getImageById = async (id) => {
  const response = await requesterService.getImageById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const sendBirthdayEmail = async () => {
  const response = await requesterService.sendBirthdayEmail();
  if (isFailureStatus(response)) {
    throw new Error('Problem with api response');
  }
  return response.data;
};

export const getTodayBirthday = async () => {
  const response = await requesterService.getTodayBirthday();
  if (isFailureStatus(response)) {
    throw new Error('Problem with api response');
  }
  return response.data;
};

export const getExternalUserById = async (id) => {
  const response = await requesterService.getExternalUserById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const deleteAction = async (actionId) => {
  const response = await requesterService.deleteAction(actionId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateAction = async (actionId, body) => {
  const response = await requesterService.updateAction(actionId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const download = async (id) => {
  const response = await requesterService.download(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const deleteAccount = async (actionId) => {
  const response = await requesterService.deleteAccount(actionId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateAccount = async (actionId, body) => {
  const response = await requesterService.updateAccount(actionId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateVotes = async (quizzId, index) => {
  const body = {
    index,
  };
  const response = await requesterService.updateVotes(quizzId, body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const deleteQuizz = async (quizzId) => {
  const response = await requesterService.deleteQuizz(quizzId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};
