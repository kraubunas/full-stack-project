import { RootState } from '../../redux-types';

export const selectProductsItems = (state: RootState) => state.products.productItems;
export const selectProductsItemsLoading = (state: RootState) => state.products.loading;
export const selectProductById = (id: string) => (state: RootState) => (state.products.productItems
  .find((product) => id === product.id));
