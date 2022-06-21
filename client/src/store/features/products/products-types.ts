import { CreateProduct, ProductPopulated } from '../../../types/products';

export type ProductState = {
  productItems: ProductPopulated[],
  loading: boolean
};

export enum ProductsActionType {
  PRODUCT_FETCH_ITEMS_LOADING = 'PRODUCT_FETCH_ITEMS_LOADING',
  PRODUCT_FETCH_ITEMS_SUCCESS = 'PRODUCT_FETCH_ITEMS_SUCCESS',
  PRODUCT_FETCH_ITEMS_FAILURE = 'PRODUCT_FETCH_ITEMS_FAILURE',
  PRODUCT_CHANGE_ITEM_AMOUNT = 'PRODUCT_CHANGE_ITEM_AMOUNT',
  PRODUCT_CREATE_NEW_ITEM = 'PRODUCT_CREATE_NEW_ITEM',
  PRODUCT_DELETE_ITEM = 'PRODUCT_DELETE_ITEM',
  PRODUCT_UPDATE_ITEM = 'PRODUCT_UPDATE_ITEM',
}

export type ProductFetchItemsLoadingAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_LOADING
};

export type ProductFetchItemsSuccessAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_SUCCESS,
  payload: {
    items: ProductPopulated[],
  }
};

export type ProductFetchItemsFailureAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_FAILURE,
  payload: {
    error: string,
  }
};

export type ProductChangeItemAmountAction = {
  type: ProductsActionType.PRODUCT_CHANGE_ITEM_AMOUNT,
  payload: {
    id: string,
    amount: number
  },
};

export type ProductCreateNewItemAction = {
  type: ProductsActionType.PRODUCT_CREATE_NEW_ITEM,
  payload: {
    item: CreateProduct;
  }
};

export type ProductDeleteItemAction = {
  type: ProductsActionType.PRODUCT_DELETE_ITEM,
  payload: {
    id: string;
  }
};

export type ProductUpdateItemAction = {
  type: ProductsActionType.PRODUCT_UPDATE_ITEM,
  payload: {
    item: ProductPopulated,
  }
};

export type ProductAction = ProductFetchItemsLoadingAction | ProductFetchItemsSuccessAction | ProductFetchItemsFailureAction | ProductChangeItemAmountAction | ProductCreateNewItemAction | ProductDeleteItemAction | ProductUpdateItemAction;
