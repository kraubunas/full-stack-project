import {
 Schema,
 model,
 Model,
 Types,
 Document,
} from 'mongoose';

type Category = {
    name: string,
    createdAt: string,
    updatedAt: string
};

export type CategoryDocument = (Document<Types.ObjectId, unknown, Category> & Category & {
    _id: Types.ObjectId;
});

const categorySchema = new Schema<Category, Model<Category>>({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const CategoryModel = model('Category', categorySchema);

export default CategoryModel;
