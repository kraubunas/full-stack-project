import {
 Schema, model, Types, Model, Document,
} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export type CartItem = {
    _id: Types.ObjectId,
    itemId: Types.ObjectId,
    amount: number,
    createdAt: string,
    updatedAt: string,

    };

export type CartItemProps = Omit<CartItem, '_id'>;

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

export type UserDocument = (Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
});

type UserModelType = Model<User>;

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
        type: [{
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        }],
        default: [],
    },
}, {
    timestamps: true,
});

userSchema.plugin(mongooseUniqueValidator);

const UserModel = model('User', userSchema);

export default UserModel;
