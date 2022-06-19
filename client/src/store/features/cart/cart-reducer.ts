/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { CartState, CartAction, CartActionType } from './cart-types';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer: Reducer<CartState, CartAction> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionType.CART_FETCH_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case CartActionType.CART_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: action.payload.items,
      };
    }

    case CartActionType.CART_FETCH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    default: return state;
  }
};

export default cartReducer;
