import { ProductDocument } from '../models/product-model';

export type ProductViewModel = {
  id: string,
  name: string,
  price: string,
  createdAt: string,
  updatedAt: string,
  categoryIds: string[],
};

const createProductViewModel = (productDoc: ProductDocument): ProductViewModel => ({
  id: productDoc._id.toString(),
  name: productDoc.name,
  price: productDoc.price,
  createdAt: productDoc.createdAt,
  updatedAt: productDoc.updatedAt,
  categoryIds: productDoc.categories.map((categoryId) => categoryId.toString()),
});

export default createProductViewModel;
