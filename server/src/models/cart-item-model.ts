import {
  Schema,
  Model,
  Types,
  Document,
  model,
} from 'mongoose';
import { ProductPopulatedDocument } from './product-model';

export type CartItem = {
  item: Types.ObjectId,
  amount: number
  createdAt: string,
  updatedAt: string,
};

export type CartItemProps = Omit<CartItem, '_id'>;

export type CartItemDocument = Document<Types.ObjectId, unknown, CartItem> & CartItem & {
  _id: Types.ObjectId;
};

export type CartItemPopulatedDocument = Omit<CartItemDocument, 'product'> & {
  product: ProductPopulatedDocument
};

const cartItemSchema = new Schema<CartItem, Model<CartItem>>({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const CartItemModel = model('CartItem', cartItemSchema);

export default CartItemModel;
