import { CartItem } from './cart-item';

export type User = {
  id: string,
  email: string,
  cartItems: CartItem[],
  role: 'user' | 'admin',
  createdAt: string,
  updatedAt: string,
};
