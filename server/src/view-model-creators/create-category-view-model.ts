import { CategoryDocument } from '../models/category-model';

export type CategoryViewModel = {
    id: string,
    name: string,
    updatedAt: string
};

const createCategoryViewModel = (categoryDoc: CategoryDocument): CategoryViewModel => ({
        id: categoryDoc._id.toString(),
        name: categoryDoc.name,
        updatedAt: categoryDoc.updatedAt,
    });

export default createCategoryViewModel;
