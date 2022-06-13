/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import axios from 'axios';
import { AppAction } from '../../redux-types';
import {
  ProductFetchItemsLoadingAction,
  ProductFetchItemsSuccessAction,
  ProductsActionType,
} from './products-types';
import Product from '../../../types/products';

const API_SERVER = process.env.REACT_APP_API_SERVER;

const productFetchItemsLoadingAction: ProductFetchItemsLoadingAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_LOADING,
};

const createProductFecthItemsSuccessAction = (items: Product[]): ProductFetchItemsSuccessAction => ({
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_SUCCESS,
  payload: { items },
});

export const productFetchItemsAction = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  dispatch(productFetchItemsLoadingAction);

  const { data } = await axios.get<Product[]>(`${API_SERVER}/products`);
  const productFecthItemsSuccessAction = createProductFecthItemsSuccessAction(data);
  dispatch(productFecthItemsSuccessAction);
};
