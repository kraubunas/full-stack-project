import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import CategoryModel from '../models/category-model';
import createCategoryViewModel, { CategoryViewModel } from '../view-model-creators/create-category-view-model';

type SingularCategoryRequestHandlerResponse = { category: CategoryViewModel } | ErrorResponseBody;

type GetCategoriesRequestHandler = RequestHandler<
undefined,
{ categories: CategoryViewModel[] }
>;

export const getCategories: GetCategoriesRequestHandler = async (req, res) => {
    const categoryDocs = await CategoryModel.find();
    res.status(200).json({
        categories: categoryDocs.map((categoryDoc) => createCategoryViewModel(categoryDoc)),
    });
};

type GetCategoryRequestHandler = RequestHandler<
    { id: string },
    SingularCategoryRequestHandlerResponse
>;

export const getCategory: GetCategoryRequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const categoryDoc = await CategoryModel.findById(id);

        if (categoryDoc === null) {
            throw new Error(`Kateorija su id: '${id}' nerasta`);
        }

        res.status(200).json({
            category: createCategoryViewModel(categoryDoc),
        });
    } catch (error) {
        res.status(404).json({
            error: error instanceof Error ? error.message : 'Klaida bandant ieskant kategorijos',
        });
    }
};

type CreateCategoryRequestHandler = RequestHandler<
    unknown,
    SingularCategoryRequestHandlerResponse,
    { title: string }
>;

export const createCategory: CreateCategoryRequestHandler = async (req, res) => {
    const categoryProps = req.body;
    try {
        const categoryDoc = await CategoryModel.create(categoryProps);
        res.status(201).json({
            category: createCategoryViewModel(categoryDoc),
        });
    } catch (err) {
        res.status(400).json({ error: 'Serverio klaida kuriant kategorijas' });
    }
};

type UpdateCategoryRequestHandler = RequestHandler<
    { id: string },
    SingularCategoryRequestHandlerResponse,
    { title: string }
>;

export const updateCategory: UpdateCategoryRequestHandler = async (req, res) => {
    const categoryProps = req.body;
    const { id } = req.params;

    try {
        const categoryDoc = await CategoryModel.findByIdAndUpdate(id, categoryProps, {
            new: true,
        });

        if (categoryDoc === null) {
            throw new Error(`Kategorija su id: '${id}' nerasta atliekant atnaujinima`);
        }

        res.status(200).json({
            category: createCategoryViewModel(categoryDoc),
        });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Serverio klaida atnaujinant kategorija',
        });
    }
};

type DeleteCategoryRequestHandler = RequestHandler<
    { id: string },
    SingularCategoryRequestHandlerResponse
    >;

export const deleteCategory: DeleteCategoryRequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const categoryDoc = await CategoryModel.findByIdAndDelete(id);
        if (categoryDoc === null) throw new Error(`Kategorija su id: '${id}' nerasta`);
        res.status(200).json({
            category: createCategoryViewModel(categoryDoc),
        });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Serverio klaida trinant kategorija',
        });
    }
};
