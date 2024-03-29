import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import { formatProductValidationError } from './products-error-formatters';
import CategoryModel, { CategoryDocument } from '../../models/category-model';
import ProductModel, { ProductPopulatedDocument, ProductDocument, ProductProps } from '../../models/product-model';
import createProductViewModel, { ProductViewModel } from '../../view-model-creators/create-product-view-model';
import createProductPopulatedViewModel, { ProductPopulatedViewModel } from '../../view-model-creators/create-product-populated-view-model';

type SingularProductResponse = { item: ProductViewModel } | ErrorResponseBody;

const validateCategoriesIds = async (categoriesIds?: string[]) => {
  if (categoriesIds !== undefined && categoriesIds.length > 0) {
    const uniqCategoryIds = [...new Set(categoriesIds)];
    const foundCategories = await CategoryModel.find({
      _id: { $in: uniqCategoryIds },
    });

    if (uniqCategoryIds.length !== foundCategories.length) {
      throw new Error('Dalis kategorijų neegzistuoja');
    }

    return uniqCategoryIds;
  }
  return [];
};

export const getProducts: RequestHandler<
  unknown,
  { items: ProductViewModel[] | ProductPopulatedViewModel[] },
  unknown,
  { populate?: string }
> = async (req, res) => {
  const { populate } = req.query;
  const shouldPopulateCategories = populate === 'categories';

  let items: ProductViewModel[] | ProductPopulatedViewModel[];
  if (shouldPopulateCategories) {
    const productPopulatedDocs = await ProductModel
      .find()
      .populate<{ categories: CategoryDocument[] }>('categories');
    items = productPopulatedDocs.map(createProductPopulatedViewModel);
  } else {
    const productDocs = await ProductModel.find();
    items = productDocs.map(createProductViewModel);
  }

  res.status(200).json({ items });
};

export const getProduct: RequestHandler<
  { id: string },
  { item: ProductViewModel | ProductPopulatedViewModel } | ErrorResponseBody,
  unknown,
  { populate?: string }
> = async (req, res) => {
  const { id } = req.params;
  const { populate } = req.query;
  const shouldPopulateCategories = populate === 'categories';

  try {
    const productDoc = shouldPopulateCategories
      ? await ProductModel.findById(id).populate<{ categories: CategoryDocument[] }>('categories')
      : await ProductModel.findById(id);

    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const item = shouldPopulateCategories
      ? createProductPopulatedViewModel(productDoc as ProductPopulatedDocument)
      : createProductViewModel(productDoc as ProductDocument);

    res.status(200).json({ item });
  } catch (error) {
    res.status(404).json({
      error: `Produktas su id '${id}' nerastas`,
    });
  }
};

export const createProduct: RequestHandler<
  unknown,
  SingularProductResponse,
  ProductProps
> = async (req, res) => {
  const productProps = req.body;
  try {
    const uniqCategoriesIds = await validateCategoriesIds(productProps.categories);
    productProps.categories = uniqCategoriesIds;
    const productDoc = await ProductModel.create(productProps);
    const productViewModel = createProductViewModel(productDoc);
    res.status(201).json({ item: productViewModel });
  } catch (err) {
    const error = err instanceof Error.ValidationError
      ? formatProductValidationError(err)
      : 'Serverio klada';
    res.status(400).json({ error });
  }
};

export const updateProduct: RequestHandler<
  { id: string },
  SingularProductResponse,
  Partial<ProductProps>
> = async (req, res) => {
  const { id } = req.params;
  const productProps = req.body;

  try {
    const uniqCategoriesIds = await validateCategoriesIds(productProps.categories);
    productProps.categories = uniqCategoriesIds;
    const productDoc = await ProductModel.findByIdAndUpdate(id, productProps, { new: true });
    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const productViewModel = createProductViewModel(productDoc);
    res.status(200).json({ item: productViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Blogi produkto duomenys',
    });
  }
};

export const deleteProduct: RequestHandler<
  { id: string },
  SingularProductResponse
> = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await ProductModel.findByIdAndDelete(id);
    if (productDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const productViewModel = createProductViewModel(productDoc);
    res.status(200).json({ item: productViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Klaida trinant produktą',
    });
  }
};
