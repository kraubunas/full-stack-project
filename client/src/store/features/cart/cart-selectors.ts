/* eslint-disable import/prefer-default-export */
import { CartItemJoined } from '../../../types/cart-item-joined';
import { RootState } from '../../redux-types';

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItemsCount = (state: RootState) => state.cart.cartItems.length;
export const selectCartJoinedItems = (state: RootState): CartItemJoined[] => [];

export const selectCartItemAmountByShopItemId = (productItemId: string) => (state: RootState) => state.cart.cartItems.find((cartItem) => cartItem.itemId === productItemId)?.amount ?? 0;
