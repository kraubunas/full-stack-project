import { CartItem } from '../models/user-model';

export type CartItemViewModel = {
  id: string,
  itemId: string,
  amount: number,
};

const createCartItemViewModel = (cartItem: CartItem): CartItemViewModel => ({
  id: cartItem._id.toString(),
  itemId: cartItem.itemId.toString(),
  amount: cartItem.amount,
});

export default createCartItemViewModel;
