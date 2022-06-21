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
  CART_DELETE_ITEM = 'CART_DELETE_ITEM',
  CART_CREATE_ITEM = 'CART_CREATE_ITEM',
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

export type CartDeleteItemAction = {
  type: CartActionType.CART_DELETE_ITEM,
  payload: {
    id: string,
  }
};

export type CartCreateItemAction = {
  type: CartActionType.CART_CREATE_ITEM,
  payload: {
    item: CartItemPopulated,
  }
};

export type CartAction = CartFetchLoadingAction | CartFetchSuccessAction | CartFetchFailureAction | CartDeleteItemAction | CartCreateItemAction;
