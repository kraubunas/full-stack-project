/* eslint-disable @typescript-eslint/no-namespace */
import { AxiosError } from 'axios';
import ApiService, { isResponseError } from './api-services';
import { User, Crudentials } from '../types';

export type AuthResponseBody = {
  user: User,
  token: string,
};

export const login = async (crudentials: Crudentials): Promise<AuthResponseBody> => {
  try {
    const response = await ApiService.post<AuthResponseBody>('/api/auth/login', crudentials);

    return response.data;
  } catch (err) {
    if (isResponseError(err)) {
      throw new Error(err.response.data.error);
    }
    console.log('Neprognozuota klaida');
    throw (err);
  }
};

export const register = async (crudentials: Crudentials): Promise<AuthResponseBody> => {
  throw new Error('Testuojames, neskubam.');
};

export const authenticate = async (token: string): Promise<AuthResponseBody> => {
  throw new Error('Testuojame authenticate metodą.');
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  throw new Error('Testuojames, neskubam.');
};

const AuthService = {
  login,
  register,
  authenticate,
  checkEmailAvailability,
};

export default AuthService;
