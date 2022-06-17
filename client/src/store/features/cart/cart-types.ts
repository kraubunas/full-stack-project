import { CartItemPopulated } from '../../../types/cart-item-populated';

export type CartState = {
  items: CartItemPopulated[],
  loading: boolean,
  error: string | null,
};

export enum CartActionType {
  CART_FETCH_ITEMS_LOADING = 'CART_FETCH_ITEMS_LOADING',
  CART_FETCH_ITEMS_SUCCESS = 'CART_FETCH_ITEMS_SUCCESS',
  CART_FETCH_ITEMS_FAILURE = 'CART_FETCH_ITEMS_FAILURE',
}

export type CartFetchItemsLoadingAction = {
  type: CartActionType.CART_FETCH_ITEMS_LOADING,
};

export type CartFetchItemsSuccessAction = {
  type: CartActionType.CART_FETCH_ITEMS_SUCCESS,
  payload: {
    items: CartItemPopulated[],
  }
};

export type CartFetchItemsFailureAction = {
  type: CartActionType.CART_FETCH_ITEMS_FAILURE,
  payload: {
    error: string,
  }
};

export type CartAction = CartFetchItemsLoadingAction | CartFetchItemsSuccessAction | CartFetchItemsFailureAction;
