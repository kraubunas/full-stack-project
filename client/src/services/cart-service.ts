import ApiService, { formatError } from './api-services';
import { CartItemPopulated } from '../types/cart-item-populated';
import { CartItem } from '../types';
import { CartItemProps } from '../types/cart-item';

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

const updateCartItem = async (
  cartItemId: string,
  cartItemProps: CartItemProps,
  token: string,
): Promise<CartItem> => {
  try {
    const { data } = await ApiService.patch<{ cartItem: CartItem }>(
      `/api/cart/update-item/${cartItemId}`,
      cartItemProps,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return data.cartItem;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const deleteCartItem = async (id: string, token: string) => {
  const { data } = await ApiService.delete<{ cartItem: CartItem }>(
    `/api/cart/delete-item/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.cartItem;
};

const CartService = {
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
};

export default CartService;
