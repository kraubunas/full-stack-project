import {
 Schema, model, Types, Model, Document,
} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { ProductDocument } from './product-model';

export type CartItem = {
    _id: Types.ObjectId,
    item: Types.ObjectId,
    amount: number,
    createdAt: string,
    updatedAt: string,

};

export type CartItemProps = Omit<CartItem, '_id' | 'item' | 'createdAt' | 'updatedAt'> & {
  itemId: string
};

export type CartItemDocument = Types.Subdocument<Types.ObjectId> & CartItem;

export type CartItemPopulatedDocument = Omit<CartItemDocument, 'item'> & {
  item: ProductDocument
};

const cartItemSchema = new Schema<CartItem>({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export type User = {
  email: string,
  password: string,
  role: 'user' | 'admin',
  cartItems: CartItem[],
  createdAt: string,
  updatedAt: string,
};

export type UserProps = Omit<User, 'createdAt' | 'updatedAt' | 'role' | 'cartItems'> & {
  cartItems?: CartItem[]
};

type UserDocumentProps = {
  cartItems: Types.DocumentArray<CartItem>;
};

type UserModelType = Model<User, unknown, UserDocumentProps>;

export type UserDocument = Document<Types.ObjectId, unknown, User> & User & {
  _id: Types.ObjectId;
} & UserDocumentProps;

const userSchema = new Schema<User, UserModelType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  cartItems: {
    type: [cartItemSchema],
    default: [],
  },
}, {
  timestamps: true,
});

userSchema.plugin(uniqueValidator);

const UserModel = model<User, UserModelType>('User', userSchema);

export default UserModel;
