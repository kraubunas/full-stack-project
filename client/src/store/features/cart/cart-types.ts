import { CartItemPopulated } from '../../../types/cart-item-populated';
import { CartItem } from '../../../types/cart-item';
import Product from '../../../types/products';

export type CartState = {
  joinedItems: CartItemPopulated[],
};

export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CART_UPDATE_ITEM = 'CART_UPDATE_ITEM',
}

export type CartAddItemAction = {
  type: CartActionType.ADD_TO_CART,
  payload: {
    id: string,
  }
};

export type CartRemoveItemAction = {
  type: CartActionType.REMOVE_FROM_CART,
  payload: {
    id: string,
  }
};

export type CartUpdateItemAction = {
  type: CartActionType.CART_UPDATE_ITEM,
  payload: {
    id: string,
  }
};

export type CartAction = CartAddItemAction | CartUpdateItemAction | CartRemoveItemAction;
