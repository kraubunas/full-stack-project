/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import Crudentials from '../types/crudentials';
import TempUser from '../types/temporary-user';
import User from '../types/user';

export type AuthPromise = (crudential: Crudentials) => Promise<User>;

const API_SERVER = process.env.REACT_APP_API_SERVER;

namespace AuthService {
  export const login: AuthPromise = async ({ email, password }: Crudentials): Promise<User> => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users?email=${email}`);

    if (tempUsers.length === 0) {
      throw new Error('User email is incorect');
    }

    const [tempUser] = tempUsers;

    if (tempUser.password !== password) {
      throw new Error('Password is incorect');
    }

    return {
      id: tempUser.id,
      email: tempUser.email,
    };
  };

  export const register: AuthPromise = async ({ email, password }: Crudentials): Promise<User> => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users`);

    const userExists = tempUsers.map((existingUser) => existingUser.email).includes(email);

    if (userExists) {
      throw new Error('This email is taken. Choose another email');
    }

    const { data: createdPermanentUser } = await axios.post(`${API_SERVER}/users`, { email, password });

    const createdUser = {
      id: createdPermanentUser.id,
      email: createdPermanentUser.email,
    };

    return createdUser;
  };
  export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const { data: tempUsers } = await axios.get<TempUser[]>(`${API_SERVER}/users`);
    const emails = tempUsers.map((x) => x.email);

    return !emails.includes(email);
  };

}

export default AuthService;
