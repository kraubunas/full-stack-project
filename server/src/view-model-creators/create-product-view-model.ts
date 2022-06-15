import { ProductDocument } from '../models/product-model';

export type ProductViewModel = {
  id: string,
  name: string,
  price: string,
  updatedAt: string,
  categoryIds: string[],
  image: string[],
};

const createProductViewModel = (productDoc: ProductDocument): ProductViewModel => ({
  id: productDoc._id.toString(),
  name: productDoc.name,
  price: productDoc.price,
  updatedAt: productDoc.updatedAt,
  categoryIds: productDoc.categories.map((categoryId) => categoryId.toString()),
  image: productDoc.image,
});

export default createProductViewModel;
