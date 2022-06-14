import { Dispatch } from 'react';
import AuthService, { AuthResponseBody } from '../../../services/auth-service';
import { Crudentials } from '../../../types';
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
export const createAuthSuccessAction = (authResponseBody: AuthResponseBody): AuthSuccessAction => ({
  type: AuthActionType.AUTH_SUCCESS,
  payload: authResponseBody,
});

export const createAuthFailureAction = (error: string): AuthFailureAction => ({
  type: AuthActionType.AUTH_FAILURE,
  payload: { error },
});

const authenticate = async (
  dispatch: Dispatch<AppAction>,
  authCallback: () => Promise<AuthResponseBody>,
  redirect?: string,
) => {
  dispatch(authLoadingAction);
  try {
    const authResponseBody = await authCallback();
    const authSuccessAction = createAuthSuccessAction(authResponseBody);
    if (redirect) {
      const navigationSetRedirectAction = createNavigationSetRedirectAction(redirect);
      dispatch(navigationSetRedirectAction);
    }
    dispatch(authSuccessAction);
    dispatch(navigationClearRedirectAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authFailureAction = createAuthFailureAction(errMsg);
    dispatch(authFailureAction);
  }
};

export const createAuthenticateActionThunk = (token: string) => async (
  dispatch: Dispatch<AppAction>,
): Promise<void> => {
  await authenticate(dispatch, async () => AuthService.authenticate(token));
};

export const createLoginActionThunk = (
  crudentials: Crudentials,
  redirect: string,
) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(dispatch, async () => AuthService.login(crudentials), redirect);
};

export const createRegisterActionThunk = (
  crudentials: Crudentials,
  redirect: string,
) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(dispatch, async () => AuthService.register(crudentials), redirect);
};
