import { Dispatch } from 'react';
import AuthService, { AuthPromise } from '../../../services/auth-service';
import Crudentials from '../../../types/crudentials';
import User from '../../../types/user';
import UserRegistration from '../../../types/user-registration';
import { AppAction } from '../../redux-types';
import { createNavigationSetRedirectAction, navigationClearRedirectAction } from '../navigation/navigation-action-creators';
import {
  AuthLoadingAction, AuthClearErrorAction, AuthLogoutAction, AuthSuccessAction, AuthFailureAction, AuthActionType,
} from './auth-types';

export const authLoadingAction: AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};
export const authClearErrorAction: AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};
export const authLogoutAction: AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT,
};
export const createAuthSuccessAction = (user: User): AuthSuccessAction => ({
  type: AuthActionType.AUTH_SUCCESS,
  payload: { user },
});

export const createAuthFailureAction = (error: string): AuthFailureAction => ({
  type: AuthActionType.AUTH_FAILURE,
  payload: { error },
});

const authenticate = async (
  dispatch: Dispatch<AppAction>,
  authCallback: AuthPromise,
  authCallbackArgs: Parameters<AuthPromise>,
  redirect: string,
) => {
  dispatch(authLoadingAction);
  try {
    const user = await authCallback(...authCallbackArgs);
    const authSuccessAction = createAuthSuccessAction(user);
    const navigationSetRedirectAction = createNavigationSetRedirectAction(redirect);
    dispatch(navigationSetRedirectAction);
    dispatch(authSuccessAction);
    dispatch(navigationClearRedirectAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authFailureAction = createAuthFailureAction(errMsg);
    dispatch(authFailureAction);
  }
};

export const createLoginAction = (
  crudentials: Crudentials,
  redirect: string,
) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(dispatch, AuthService.login, [crudentials], redirect);
};

export const createRegisterAction = (
  userRegistration: UserRegistration,
  redirect: string,
) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(dispatch, AuthService.register, [userRegistration], redirect);
};
