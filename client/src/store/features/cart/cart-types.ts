import { CartItemJoined } from '../../../types/cart-item-joined';
import { CartItem } from '../../../types/cart-item-type';
import Product from '../../../types/products';

export type CartState = {
  cartItems: CartItem[],
  products: Product[],
  joinedItems: CartItemJoined[],
};

export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CART_UPDATE_ITEM = 'CART_UPDATE_ITEM',
}

export type CartAddItemAction = {
  type: CartActionType.ADD_TO_CART,
  payload: {
    itemId: string,
    id: string,
    amount: number,
  }
};

export type CartRemoveItemAction = {
  type: CartActionType.REMOVE_FROM_CART,
  payload: {
    itemId: string,
    id: string,
    amount: number,
  }
};

export type CartUpdateItemAction = {
  type: CartActionType.CART_UPDATE_ITEM,
  payload: {
    itemId: string,
    id: string,
    amount: number,
  }
};

export type CartAction = CartAddItemAction | CartUpdateItemAction | CartRemoveItemAction;
