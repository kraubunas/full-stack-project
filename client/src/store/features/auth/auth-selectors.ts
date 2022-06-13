import { RootState } from '../../redux-types';

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectLoggedIn = (state: RootState) => Boolean(state.auth.user);
