import { CartItem } from '../models/user-model';

export type CartItemViewModel = {
  id: string,
  itemId: string,
  amount: number,
  updatedAt: string,
};

const createCartItemViewModel = (cartItem: CartItem): CartItemViewModel => ({
  id: cartItem._id.toString(),
  itemId: cartItem.item.toString(),
  amount: cartItem.amount,
  updatedAt: cartItem.updatedAt,
});

export default createCartItemViewModel;
