/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { v4 as createId } from 'uuid';
import { CartAction, CartActionType, CartState } from './cart-types';

const initialState: CartState = {
  joinedItems: [],
};

const cartReducer: Reducer<CartState, CartAction> = (state = initialState, action) => {
  const inCart = state.joinedItems.find((itm) => (itm.id === action.payload.id));
  // const items = state.products.find((prod) => prod.id === action.payload.itemId);
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      return {
        ...state,
        cartItems: inCart
          ? state.joinedItems.map((item) => (item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 } : item))
          : [...state.joinedItems, {
            id: createId(), itemId: action.payload.id, amount: 1,
          }],
        // cia isidet name, category price
      };
    }

    case CartActionType.CART_UPDATE_ITEM: {
      return {
        ...state,
        cartItems: state.joinedItems.map((item) => (
          item.id !== action.payload.id
            ? { ...item, amount: item.amount }
            : item
        )),
      };
    }

    case CartActionType.REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.joinedItems.filter((item) => (item.id !== action.payload.id)),
      };
    }

    default: return state;
  }
};

export default cartReducer;

// if item.payload.itemid ===
