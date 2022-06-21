import { CartItemPopulatedDocument } from '../models/user-model';
import createProductViewModel, { ProductViewModel } from './create-product-view-model';

export type CartItemPopulatedViewModel = {
  id: string,
  item: ProductViewModel
  createdAt: string,
  updatedAt: string,
};

const createCartItemPopulatedViewModel = (cartItemPopulatedDoc: CartItemPopulatedDocument):
  CartItemPopulatedViewModel => ({
    id: cartItemPopulatedDoc._id.toString(),
    item: createProductViewModel(cartItemPopulatedDoc.item),
    createdAt: cartItemPopulatedDoc.createdAt,
    updatedAt: cartItemPopulatedDoc.updatedAt,
  });

export default createCartItemPopulatedViewModel;
