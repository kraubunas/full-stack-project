import {
 Schema, model, Types, Document, Model,
} from 'mongoose';

type Product = {
    name: string,
    categories: Types.ObjectId[]
    price: string,
    image: string,
    createdAt: string,
    updatedAt: string,
};

export type ProductDocument = (Document<Types.ObjectId, unknown, Product> & Product & {
    _id: Types.ObjectId;
});

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
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const ProductModel = model('Product', productSchema);

export default ProductModel;
