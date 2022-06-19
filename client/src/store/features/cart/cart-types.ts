import { CartItemPopulated } from '../../../types/cart-item-populated';

export type CartState = {
  items: CartItemPopulated[],
  loading: boolean,
  error: string | null,
};

export enum CartActionType {
  CART_FETCH_LOADING = 'CART_FETCH_LOADING',
  CART_FETCH_SUCCESS = 'CART_FETCH_SUCCESS',
  CART_FETCH_FAILURE = 'CART_FETCH_FAILURE',
}

export type CartFetchLoadingAction = {
  type: CartActionType.CART_FETCH_LOADING,
};

export type CartFetchSuccessAction = {
  type: CartActionType.CART_FETCH_SUCCESS,
  payload: {
    items: CartItemPopulated[],
  }
};

export type CartFetchFailureAction = {
  type: CartActionType.CART_FETCH_FAILURE,
  payload: {
    error: string,
  }
};

export type CartAction = CartFetchLoadingAction | CartFetchSuccessAction | CartFetchFailureAction;
