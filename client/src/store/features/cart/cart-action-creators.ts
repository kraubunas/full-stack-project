/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { CartItemPopulated } from '../../../types/cart-item-populated';
import { AppAction, RootState } from '../../redux-types';
import CartService from '../../../services/cart-service';
import {
  CartFetchLoadingAction,
  CartFetchSuccessAction,
  CartFetchFailureAction,
  CartActionType,
} from './cart-types';

const cartFetchItemsLoadingAction: CartFetchLoadingAction = {
  type: CartActionType.CART_FETCH_LOADING,
};

const createCartFetchItemsSuccessAction = (cartItems: CartItemPopulated[]): CartFetchSuccessAction => ({
  type: CartActionType.CART_FETCH_SUCCESS,
  payload: { items: cartItems },
});

const createCartFetchItemsFailureAction = (error: string): CartFetchFailureAction => ({
  type: CartActionType.CART_FETCH_FAILURE,
  payload: { error },
});

export const cartFetchItemsActionThunk = async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  try {
    if (token === null) {
      throw new Error('Prasome prisijungti');
    }
    dispatch(cartFetchItemsLoadingAction);
    const cartItems: CartItemPopulated[] = await CartService.fetchCartItems(token);

    const cartFetchItemsSuccessAction = createCartFetchItemsSuccessAction(cartItems);
    dispatch(cartFetchItemsSuccessAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authFailureAction = createCartFetchItemsFailureAction(errMsg);
    dispatch(authFailureAction);
  }
};

export const createCartAddItemAction = (item: CartItemPopulated[]) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Please login');
  }
  await CartService.createNewCartItem(item, token);
  cartFetchItemsActionThunk(dispatch, getState);
};

export const cartDeleteItemAction = (id: string) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Please login');
  }
  await CartService.deleteCartItem(id, token);
  cartFetchItemsActionThunk(dispatch, getState);
};
