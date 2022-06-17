/* eslint-disable import/prefer-default-export */
import {
  CartActionType, CartAddItemAction, CartUpdateItemAction, CartRemoveItemAction,
} from './cart-types';

export const createAddToCartAction = (id: string): CartAddItemAction => ({
  type: CartActionType.ADD_TO_CART,
  payload: { id },
});

export const createCartUpdateItemAction = (id: string): CartUpdateItemAction => ({
  type: CartActionType.CART_UPDATE_ITEM,
  payload: { id },
});

export const removeFromCart = (id: string): CartRemoveItemAction => ({
  type: CartActionType.REMOVE_FROM_CART,
  payload: { id },
});

// export const createAddToCartActionThunk = (itemId: string, id: string, amount: number, name: string, category: string, price: string) => (
//   dispatch: Dispatch<AppAction>,
//   getStore: () => RootState,
// ): void => {
// // POanaudodami funkcija getStore, suraskite item'1 pagal itemId ir sukurkite reikaling1 CArtItem
//   const { products, cart } = getStore();
//   const inCart = cart.cartItems.find((itm) => ((itm.id === itemId)));
//   const productsItem = products.productItems.find((x) => x.id === itemId) as Product;

//   const totalAmount = inCart ? inCart.amount + productsItem.amount : productsItem.amount;

//   if (inCart) {
//     if (amount > 0) {
//       const cartUpdateItemAction = createCartUpdateItemAction();
//       dispatch(cartUpdateItemAction);
//     } else {
//       const removeFromCartAction = removeFromCart(inCart.itemId, inCart.id, amount, name, category, price);
//       dispatch(removeFromCartAction);
//     }
//   } else {
//     const addToCartAction = createAddToCartAction(id, itemId, amount, name, category, price);
//     dispatch(addToCartAction);
//   }
// };
