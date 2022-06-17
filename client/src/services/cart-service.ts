import ApiService, { formatError } from './api-services';
import { CartItemPopulated } from '../types/cart-item-populated';

const fetchCartItems = async (token: string): Promise<CartItemPopulated[]> => {
  try {
    const { data } = await ApiService.get<{ cartItems: CartItemPopulated[] }>(
      '/api/cart',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return data.cartItems;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const CartService = {
  fetchCartItems,
};

export default CartService;
