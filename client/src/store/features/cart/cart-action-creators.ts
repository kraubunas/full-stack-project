/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { CartItemPopulated } from '../../../types/cart-item-populated';
import { AppAction, RootState } from '../../redux-types';
import CartService from '../../../services/cart-service';
import {
  CartFetchItemsLoadingAction,
  CartFetchItemsSuccessAction,
  CartFetchItemsFailureAction,
  CartActionType,
} from './cart-types';

const cartFetchItemsLoadingAction: CartFetchItemsLoadingAction = {
  type: CartActionType.CART_FETCH_ITEMS_LOADING,
};

const createCartFetchItemsSuccessAction = (cartItems: CartItemPopulated[]): CartFetchItemsSuccessAction => ({
  type: CartActionType.CART_FETCH_ITEMS_SUCCESS,
  payload: { items: cartItems },
});

const createCartFetchItemsFailureAction = (error: string): CartFetchItemsFailureAction => ({
  type: CartActionType.CART_FETCH_ITEMS_FAILURE,
  payload: { error },
});

export const createModifyCartItemActionThunk = (productId: string) => (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): void => {
  const { cart } = getState();
  const existingCartItem = cart.items.find((x) => x.item.id === productId);

  // if (existingCartItem) {
  //   if (newAmount > 0) {
  //     // Siunčiama užklausa į serverį, kad atnaujinti egzistuojantį CartItem
  //     const cartUpdateItemAction = createCartUpdateItemAction(existingCartItem.id, newAmount);
  //     dispatch(cartUpdateItemAction);
  //   } else {
  //     // Siunčiama užklausa į serverį, kad ištrinti egzistuojantį CartItem
  //     const cartDeleteItemAction = createCartDeleteItemAction(existingCartItem.id);
  //     dispatch(cartDeleteItemAction);
  //   }
  // } else {
  //   // Siunčiama užklausa į serverį, kad sukurti CartItem
  //   const cartAddItemAction = createCartAddItemAction(productId, newAmount);
  //   dispatch(cartAddItemAction);
  // }
};

export const cartFetchItemsActionThunk = async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  try {
    if (token === null) {
      throw new Error('Prasome prisijungti');
    }
    dispatch(cartFetchItemsLoadingAction);
    // Siunčiama užklausa į serverį, kad parsiųsti visus CartItem'us
    const cartItems: CartItemPopulated[] = await CartService.fetchCartItems(token);

    const cartFetchItemsSuccessAction = createCartFetchItemsSuccessAction(cartItems);
    dispatch(cartFetchItemsSuccessAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authFailureAction = createCartFetchItemsFailureAction(errMsg);
    dispatch(authFailureAction);
  }
};
