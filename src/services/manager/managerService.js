import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const sendResetEmail = async (email) => {
    const teste = JSON.parse(email);
    const response = await requesterService.sendResetEmail(teste);
    if (isFailureStatus(response)) {
        console.log(response);
        throw new Error('Problem with api response');
        }
    return response;
  };
