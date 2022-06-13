import { ProductDocument } from '../models/product-model';
import createCategoryViewModel, { CategoryViewModel } from './create-category-view-model';
import CategoryModel from '../models/category-model';

type ProductViewModelCommonProps = {
    id: string,
    name: string,
    price: string,
    image: string,
    createdAt: string,
    updatedAt: string
};

export type ProductViewModel = ProductViewModelCommonProps & {
    categoryIds: string[],
};

export type ProductJoinedViewModel = ProductViewModelCommonProps & {
    categories: CategoryViewModel[],
};

const createProductViewModel = async (
    productDoc: ProductDocument,
    shouldPopulateCategories: boolean,
): Promise<ProductViewModel | ProductJoinedViewModel> => {
    const commonProps: ProductViewModelCommonProps = {
        id: productDoc._id.toString(),
        name: productDoc.name,
        price: productDoc.price,
        image: productDoc.image,
        createdAt: productDoc.createdAt,
        updatedAt: productDoc.updatedAt,
    };

    if (shouldPopulateCategories) {
        const productCategoryDocs = await CategoryModel.find({
            _id: { $in: productDoc.categories },
        });
        const productCategories = productCategoryDocs.map(
            (productCategoryDoc) => createCategoryViewModel(productCategoryDoc),
            );
        return {
            ...commonProps,
            categories: productCategories,
        };
    }
        return {
            ...commonProps,
            categoryIds: productDoc.categories.map((categoryId) => categoryId.toString()),
        };
};

export default createProductViewModel;
