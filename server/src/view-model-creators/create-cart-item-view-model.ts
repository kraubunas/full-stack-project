import { CartItem } from '../models/user-model';

export type CartItemViewModel = {
  id: string,
  itemId: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
};

const createCartItemViewModel = (cartItem: CartItem): CartItemViewModel => ({
  id: cartItem._id.toString(),
  itemId: cartItem.itemId.toString(),
  amount: cartItem.amount,
  createdAt: cartItem.createdAt,
  updatedAt: cartItem.updatedAt,
});

export default createCartItemViewModel;
