import { Router } from 'express';
import {
    createCategory, getCategories, getCategory, updateCategory, deleteCategory,
} from '../controllers/categories-controller';
import { authMiddleWare, adminMiddleware } from '../middlewares/auth-middlewares';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategory);
categoriesRouter.post('/', authMiddleWare, adminMiddleware, createCategory);
categoriesRouter.patch('/:id', authMiddleWare, adminMiddleware, updateCategory);
categoriesRouter.delete('/:id', authMiddleWare, adminMiddleware, deleteCategory);

export default categoriesRouter;
