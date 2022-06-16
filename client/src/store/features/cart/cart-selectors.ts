/* eslint-disable import/prefer-default-export */
import { CartItemPopulated } from '../../../types/cart-item-populated';
import { RootState } from '../../redux-types';

export const selectCartItems = (state: RootState) => state.cart.joinedItems;
export const selectCartItemsCount = (state: RootState) => state.cart.joinedItems.length;
export const selectCartJoinedItems = (state: RootState): CartItemPopulated[] => [];

export const selectCartItemAmountByShopItemId = (productItemId: string) => (state: RootState) => state.cart.joinedItems.find((cartItem) => cartItem.id === productItemId)?.amount ?? 0;
