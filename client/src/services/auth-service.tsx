import ApiService, { isResponseError } from './api-services';
import { Crudentials, User } from '../types';

export type AuthResponseBody = {
  user: User,
  token: string,
};

export type AuthPromise = (crudential: Crudentials) => Promise<AuthResponseBody>;

export const login: AuthPromise = async (crudentials: Crudentials) => {
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

export const register: AuthPromise = async ({ email, password }: Crudentials) => {
  throw new Error('Testuojames, neskubam.');
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  throw new Error('Testuojames, neskubam.');
};

const AuthService = {
  login,
  register,
  checkEmailAvailability,
};

export default AuthService;
