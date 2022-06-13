import { combineReducers } from 'redux';
import productsReducer from './features/products/products-reducer';
import cartReducer from './features/cart/cart-reducer';
import authReducer from './features/auth/auth-reducer';
import navigationReducer from './features/navigation/navigation-reducer';

const mainReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  navigation: navigationReducer,
});

export default mainReducer;
