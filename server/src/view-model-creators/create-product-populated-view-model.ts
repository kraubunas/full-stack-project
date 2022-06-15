import { ProductPopulatedDocument } from '../models/product-model';
import { ProductViewModel } from './create-product-view-model';

export type ProductPopulatedViewModel = Omit<ProductViewModel, 'categoryIds'> & {
  categories: string[],
};

const createProductPopulatedViewModel = (
  productPopulatedDoc: ProductPopulatedDocument,
): ProductPopulatedViewModel => ({
  id: productPopulatedDoc._id.toString(),
  name: productPopulatedDoc.name,
  price: productPopulatedDoc.price,
  updatedAt: productPopulatedDoc.updatedAt,
  categories: productPopulatedDoc.categories.map((categoryDoc) => categoryDoc.name),
  image: productPopulatedDoc.image,
});

export default createProductPopulatedViewModel;
