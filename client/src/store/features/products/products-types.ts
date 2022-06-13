import Product from '../../../types/products';

export type ProductState = {
  productItems: Product[],
  loading: boolean
};

export enum ProductsActionType {
  PRODUCT_FETCH_ITEMS_LOADING = 'PRODUCT_FETCH_ITEMS_LOADING',
  PRODUCT_FETCH_ITEMS_SUCCESS = 'PRODUCT_FETCH_ITEMS_SUCCESS',
  PRODUCT_FETCH_ITEMS_FAILURE = 'PRODUCT_FETCH_ITEMS_FAILURE',
  PRODUCT_CHANGE_ITEM_AMOUNT = 'PRODUCT_CHANGE_ITEM_AMOUNT',
}

export type ProductFetchItemsLoadingAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_LOADING
};

export type ProductFetchItemsSuccessAction = {
  type: ProductsActionType.PRODUCT_FETCH_ITEMS_SUCCESS,
  payload: {
    items: Product[],
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

export type ProductAction = ProductFetchItemsLoadingAction | ProductFetchItemsSuccessAction | ProductFetchItemsFailureAction | ProductChangeItemAmountAction;
