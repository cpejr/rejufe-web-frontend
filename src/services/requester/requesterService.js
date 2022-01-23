import qs from 'querystring';
import httpClient from '../../hooks/httpClient';

export const sendResetEmail = (email) => httpClient.post('/login/forgotten_password', email);
