/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { ProductState, ProductAction, ProductsActionType } from './products-types';

const initialState: ProductState = {
  productItems: [],
  loading: false,
};

const productsReducer: Reducer<ProductState, ProductAction> = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionType.PRODUCT_FETCH_ITEMS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProductsActionType.PRODUCT_FETCH_ITEMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        productItems: action.payload.items,
      };
    }

    case ProductsActionType.PRODUCT_CHANGE_ITEM_AMOUNT: {
      return {
        ...state,
        productItems: state.productItems.map((item) => (item.id === action.payload.id
          ? { ...item, amount: action.payload.amount }
          : item
        )),
      };
    }

    default: return state;
  }
};

export default productsReducer;
