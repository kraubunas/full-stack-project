import ApiService, { isResponseError } from './api-services';
import { Crudentials, User } from '../types';

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
    throw (err);
  }
};

export const register = async (crudentials: Crudentials): Promise<AuthResponseBody> => {
  throw new Error('Testuojames, neskubam.');
};

export const authenticate = async (token: string): Promise<AuthResponseBody> => {
  try {
    const response = await ApiService.post<AuthResponseBody>('/api/auth/authenticate', {}, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (err) {
    if (isResponseError(err)) {
      throw new Error(err.response.data.error);
    }
    throw (err);
  }
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    const response = await ApiService.get<{ valid: boolean }>(`/api/auth/check-email?email=${email}`);

    return response.data.valid;
  } catch (err) {
    if (isResponseError(err)) {
      throw new Error(err.response.data.error);
    }
    throw (err);
  }
};

const AuthService = {
  login,
  register,
  authenticate,
  checkEmailAvailability,
};

export default AuthService;
