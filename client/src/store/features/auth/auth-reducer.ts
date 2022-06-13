/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { getLocalStorageItem, setLocalStoreageItem } from '../../../helpers/local-storage-helpers';
import { AuthAction, AuthActionType, AuthState } from './auth-types';

const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

const initialState: AuthState = {
  user: getLocalStorageItem(USER_KEY_IN_LOCAL_STORAGE),
  error: null,
  loading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_SUCCESS: {
      setLocalStoreageItem(USER_KEY_IN_LOCAL_STORAGE, action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }

    case AuthActionType.AUTH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case AuthActionType.AUTH_LOGOUT: {
      localStorage.removeItem(USER_KEY_IN_LOCAL_STORAGE);
      return {
        ...state,
        user: null,
      };
    }

    case AuthActionType.AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case AuthActionType.AUTH_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    default: return state;
  }
};

export default authReducer;
