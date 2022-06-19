/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { CartItemPopulated } from '../../../types/cart-item-populated';
import { AppAction, RootState } from '../../redux-types';
import CartService from '../../../services/cart-service';
import {
  CartFetchLoadingAction,
  CartFetchSuccessAction,
  CartFetchFailureAction,
  CartActionType,
} from './cart-types';

const cartFetchItemsLoadingAction: CartFetchLoadingAction = {
  type: CartActionType.CART_FETCH_LOADING,
};

const createCartFetchItemsSuccessAction = (cartItems: CartItemPopulated[]): CartFetchSuccessAction => ({
  type: CartActionType.CART_FETCH_SUCCESS,
  payload: { items: cartItems },
});

const createCartFetchItemsFailureAction = (error: string): CartFetchFailureAction => ({
  type: CartActionType.CART_FETCH_FAILURE,
  payload: { error },
});

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

export const createModifyCartItemActionThunk = (productId: string, amount: number) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { cart, auth: { token } } = getState();

  try {
    if (token === null) {
      throw new Error('You need to login');
    }

    const existingCartItem = cart.items.find((x) => x.item.id === productId);
    console.log({ productId, amount });

    if (existingCartItem) {
      if (amount > 0) {
      // Siunčiama užklausa į serverį, kad atnaujinti egzistuojantį CartItem

        await CartService.updateCartItem(
          existingCartItem.id,
          { amount },
          token,
        );

        await cartFetchItemsActionThunk(dispatch, getState);
      } else {
      // Siunčiama užklausa į serverį, kad ištrinti egzistuojantį CartItem
      }
    } else {
    // Siunčiama užklausa į serverį, kad sukurti CartItem
    // const cartAddItemAction = createCartAddItemAction(productId, newAmount);
    // dispatch(cartAddItemAction);
      // }
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const authFailureAction = createCartFetchItemsFailureAction(errMsg);
    dispatch(authFailureAction);
  }
};
