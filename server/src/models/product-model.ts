import {
 Schema, model, Types, Document, Model,
} from 'mongoose';
import { CategoryDocument } from './category-model';

type Product = {
    name: string,
    categories: Types.ObjectId[]
    price: string,
    image: string[],
    createdAt: string,
    updatedAt: string,
};

export type ProductProps = Omit<Product, 'createdAt' | 'updatedAt' | 'categories'> & {
  categories?: string[],
};

export type ProductDocument = (Document<Types.ObjectId, unknown, Product> & Product & {
    _id: Types.ObjectId;
});

export type ProductPopulatedDocument = Omit<ProductDocument, 'categories'> & {
  categories: CategoryDocument[]
};

const productSchema = new Schema<Product, Model<Product>>({
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        default: [],
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});

const ProductModel = model('Item', productSchema);

export default ProductModel;
