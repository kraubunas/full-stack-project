/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { v4 as createId } from 'uuid';
import { CartItem } from '../../../types/cart-item-type';
import { CartAction, CartActionType, CartState } from './cart-types';

const initialState: CartState = {
  cartItems: [],
  joinedItems: [],
  products: [],
};

const cartReducer: Reducer<CartState, CartAction> = (state = initialState, action) => {
  const inCart = state.cartItems.find((itm) => (itm.id === action.payload.itemId));
  // const items = state.products.find((prod) => prod.id === action.payload.itemId);
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      return {
        ...state,
        cartItems: inCart
          ? state.cartItems.map((item) => (item.itemId === action.payload.id
            ? { ...item, amount: item.amount + 1 } : item))
          : [...state.cartItems, {
            id: createId(), itemId: action.payload.itemId, amount: 1,
          }],
        // cia isidet name, category price
      };
    }

    case CartActionType.CART_UPDATE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => (
          item.id !== action.payload.itemId
            ? { ...item, amount: item.amount }
            : item
        )),
      };
    }

    case CartActionType.REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => (item.id !== action.payload.itemId)),
      };
    }

    default: return state;
  }
};

export default cartReducer;

// if item.payload.itemid ===
