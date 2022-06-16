import { CartItem } from '../models/user-model';

export type CartItemViewModel = {
  id: string,
  item: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
};

const createCartItemViewModel = (cartItem: CartItem): CartItemViewModel => ({
  id: cartItem._id.toString(),
  item: cartItem.item.toString(),
  amount: cartItem.amount,
  createdAt: cartItem.createdAt,
  updatedAt: cartItem.updatedAt,
});

export default createCartItemViewModel;
