import { Router } from 'express';
import {
    deleteProduct, getProducts, createProduct, getProduct, updateProduct,
} from '../controllers/products-controller';
import { adminMiddleware, authMiddleWare } from '../middlewares/auth-middlewares';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', authMiddleWare, adminMiddleware, createProduct);
productsRouter.patch('/:id', authMiddleWare, adminMiddleware, updateProduct);
productsRouter.delete('/:id', authMiddleWare, adminMiddleware, deleteProduct);

export default productsRouter;
