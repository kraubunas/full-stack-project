import { ThunkDispatch } from 'redux-thunk';
import { AuthAction, AuthState } from './features/auth/auth-types';
import { NavigationAction, NavigationState } from './features/navigation/navigation-types';
import { CartAction, CartState } from './features/cart/cart-types';
import { ProductState, ProductAction } from './features/products/products-types';

export type RootState = {
  products: ProductState,
  cart: CartState,
  auth: AuthState,
  navigation: NavigationState,
};

export type AppAction = AuthAction | CartAction | NavigationAction | ProductAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;
