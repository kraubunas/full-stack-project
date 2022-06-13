"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
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
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
