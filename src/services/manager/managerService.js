import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const getById = async (id) => {
  const response = await requesterService.getById(id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getUserEmailByUsername = async (user) => {
  const response = await requesterService.getUserEmailByUsername(user);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const register = async (body) => {
  const response = await requesterService.register(body);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
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

  let allAssociates = [];
  do {
    response = await requesterService.getAssociates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allAssociates = allAssociates.concat(response.data);
    times += 1;
  } while (response.data.length === 0);
  return allAssociates;
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

export const getExternalAssociates = async (field, filter) => {
  let times = 0;
  let response;

  let allAssociates = [];
  do {
    response = await requesterService.getExternalAssociates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allAssociates = allAssociates.concat(response.data);
    times += 1;
  } while (response.data.length === 0);
  return allAssociates;
};
