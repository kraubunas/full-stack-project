import { ProductPopulatedDocument } from '../models/product-model';
import createCategoryViewModel, { CategoryViewModel } from './create-category-view-model';
import { ProductViewModel } from './create-product-view-model';

export type ProductPopulatedViewModel = Omit<ProductViewModel, 'categoryIds'> & {
  categories: CategoryViewModel[],
};

const createProductPopulatedViewModel = (
  productPopulatedDoc: ProductPopulatedDocument,
): ProductPopulatedViewModel => ({
  id: productPopulatedDoc._id.toString(),
  name: productPopulatedDoc.name,
  price: productPopulatedDoc.price,
  createdAt: productPopulatedDoc.createdAt,
  updatedAt: productPopulatedDoc.updatedAt,
  categories: productPopulatedDoc.categories.map(createCategoryViewModel),
});

export default createProductPopulatedViewModel;
