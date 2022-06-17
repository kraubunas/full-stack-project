import { RootState } from '../../redux-types';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: RootState) => state.cart.items.length;
export const selectCartJoinedItems = (state: RootState) => state.cart.items;
export const selectCartItemAmountByProductId = (productId: string) => (state: RootState) => state
  .cart.items.find((cartItem) => cartItem.item.id === productId)?.amount ?? 0;
