import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import CategoryModel from '../../models/category-model';
import ProductModel from '../../models/product-model';
import createProductViewModel, { ProductJoinedViewModel, ProductViewModel } from '../../view-model-creators/create-product-view-model';
import { formatProductValidationError } from './products-error-formatters';

const validateCategoriesIds = async (categoriesIds: string[]) => {
    if (categoriesIds instanceof Array && categoriesIds.length > 0) {
        const uniqCategoryIds = [...new Set(categoriesIds)];
        const foundCategories = await CategoryModel.find({
            _id: { $in: uniqCategoryIds },
        });
        if (uniqCategoryIds.length !== foundCategories.length) {
            throw new Error('dalis kategoriju neegzistuoja');
        }
        return uniqCategoryIds;
    }
    return [];
};

type GetProducts = RequestHandler<
    unknown,
    { products: (ProductViewModel | ProductJoinedViewModel)[] },
    unknown,
    { populate: string }>;

export const getProducts: GetProducts = async (req, res) => {
    const { populate } = req.query;

    const productDocs = await ProductModel.find();

    const shouldPopulateCategories = populate === 'categories';

    const productViewModelPromises = productDocs.map(
        async (productDoc) => createProductViewModel(productDoc, shouldPopulateCategories),
        );

    const productsViewModels = await Promise.all(productViewModelPromises);

    res.status(200).json({
        products: productsViewModels,
    });
};

type GetProduct = RequestHandler<
    { id: string },
    { product: ProductViewModel | ProductJoinedViewModel } | ErrorResponseBody,
    unknown,
    { populate?: string }
>;

export const getProduct: GetProduct = async (req, res) => {
    const { id } = req.params;
    const { populate } = req.query;

    try {
        const product = await ProductModel.findById(id);

        if (product === null) {
            throw new Error(`Produktas su id: '${id}' nerastas`);
        }
        const shouldPopulateCategories = populate === 'categories';
        const productViewModel = await createProductViewModel(product, shouldPopulateCategories);
        res.status(200).json({
            product: productViewModel,
        });
    } catch (error) {
        res.status(404).json({
            error: `Produktas su id '${id}' nerastas`,
        });
    }
};

export const createProduct: RequestHandler = async (req, res) => {
    const productProps = req.body;
    try {
        const uniqCategoriesIds = await validateCategoriesIds(productProps.categories);
        productProps.categories = uniqCategoriesIds;
        const createdProduct = await ProductModel.create(productProps);
        res.status(201).json(createdProduct);
    } catch (err) {
        let error: string;
        if (err instanceof Error.ValidationError) {
            if (err instanceof Error.ValidationError) {
                error = formatProductValidationError(err);
            } else {
                error = 'Serverio klaida';
            }
            res.status(400).json({ error });
        }
    }
};

export const updateProduct: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const productProps = req.body;

    try {
        const uniqCategoriesIds = await validateCategoriesIds(productProps.categories);
        productProps.categories = uniqCategoriesIds;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          id,
          productProps,
          { new: true },
          );
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: error instanceof Error ? error.message : 'Blogi produkto duomenys',
        });
    }
};

export const deleteProduct: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (deletedProduct === null) throw new Error(`Produktas su id: '${id}' nerastas`);
        res.status(200).json({
            msg: 'Produktas sekmingai istrintas',
            product: deletedProduct,
        });
    } catch (error) {
        res.status(404).json({
            error: error instanceof Error ? error.message : error,
        });
    }
};
