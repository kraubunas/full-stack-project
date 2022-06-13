import { RootState } from '../../redux-types';

export const selectProductsItems = (state: RootState) => state.products.productItems;
export const selectProductsItemsLoading = (state: RootState) => state.products.loading;
