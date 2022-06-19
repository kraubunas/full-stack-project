/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { AppAction, RootState } from '../../redux-types';
import {
  ProductFetchItemsFailureAction,
  ProductFetchItemsLoadingAction,
  ProductFetchItemsSuccessAction,
  ProductsActionType,
} from './products-types';
import { CreateProduct, ProductPopulated } from '../../../types/products';
import ProductService from '../../../services/products-service';

const productFetchItemsLoadingAction: ProductFetchItemsLoadingAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_LOADING,
};

const createProductFecthItemsSuccessAction = (items: ProductPopulated[]): ProductFetchItemsSuccessAction => ({
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_SUCCESS,
  payload: { items },
});

const createProductFecthItemsFailureAction = (error: string): ProductFetchItemsFailureAction => ({
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_FAILURE,
  payload: { error },
});

export const productFetchItemsActionThunk = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  dispatch(productFetchItemsLoadingAction);
  try {
    const items = await ProductService.fetchProducts();
    const shopFecthProductsSuccessAction = createProductFecthItemsSuccessAction(items);
    dispatch(shopFecthProductsSuccessAction);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const shopFetchProductsFailureAction = createProductFecthItemsFailureAction(errMsg);
    dispatch(shopFetchProductsFailureAction);
  }
};

export const productCreateNewProductAction = (item: CreateProduct) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Please login');
  }
  await ProductService.createNewProduct(item, token);
  productFetchItemsActionThunk(dispatch);
};

export const productDeleteProductAction = (id: string) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Please login');
  }
  await ProductService.deleteProduct(id, token);
  productFetchItemsActionThunk(dispatch);
};
