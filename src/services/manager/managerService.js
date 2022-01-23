import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const sendResetEmail = async (email) => {
    const response = await requesterService.sendResetEmail(JSON.parse(email));
    if (isFailureStatus(response)) {
        throw new Error('Problem with api response');
        }
    return response;
  };
