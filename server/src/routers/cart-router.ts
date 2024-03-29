import { Router } from 'express';
import {
 addItem, deleteItem, getCart, updateItem,
} from '../controllers/cart-controller';
import { authMiddleWare, userMiddleware } from '../middlewares/auth-middlewares';

const cartRouter = Router();

cartRouter.use(authMiddleWare, userMiddleware);

cartRouter.get('/', getCart);
cartRouter.post('/add-item', addItem);
cartRouter.patch('/update-item/:itemId', updateItem);
cartRouter.delete('/delete-item/:itemId', deleteItem);

export default cartRouter;
