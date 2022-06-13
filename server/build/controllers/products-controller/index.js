"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const mongoose_1 = require("mongoose");
const category_model_1 = __importDefault(require("../../models/category-model"));
const product_model_1 = __importDefault(require("../../models/product-model"));
const products_error_formatters_1 = require("./products-error-formatters");
const validateCategoriesIds = (categoriesIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (categoriesIds instanceof Array && categoriesIds.length > 0) {
        const uniqCategoryIds = [...new Set(categoriesIds)];
        const foundCategories = yield category_model_1.default.find({
            _id: { $in: uniqCategoryIds }
        });
        if (uniqCategoryIds.length !== foundCategories.length) {
            throw new mongoose_1.Error('dalis kategoriju neegzistuoja');
        }
        return uniqCategoryIds;
    }
    return [];
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    res.status(200).json(products);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield product_model_1.default.findById(id);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json({
            error: `Produktas su id: '${id}' nerastas`,
        });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productProps = req.body;
    try {
        const createdProduct = yield product_model_1.default.create(productProps);
        res.status(201).json(createdProduct);
    }
    catch (err) {
        let error;
        if (err instanceof mongoose_1.Error.ValidationError) {
            if (err instanceof mongoose_1.Error.ValidationError) {
                error = (0, products_error_formatters_1.formatProductValidationError)(err);
            }
            else {
                error = 'Serverio klaida';
            }
            res.status(400).json({ error });
        }
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productProps = req.body;
    try {
        const uniqCategoriesIds = yield validateCategoriesIds(productProps.categories);
        productProps.categories = uniqCategoriesIds;
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, productProps, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: error instanceof mongoose_1.Error ? error.message : 'Blogi produkto duomenys',
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
        if (deletedProduct === null)
            throw new mongoose_1.Error(`Produktas su id: '${id}' nerastas`);
        res.status(200).json({
            msg: `Produktas sekmingai istrintas`,
            product: deletedProduct
        });
    }
    catch (error) {
        res.status(404).json({
            error: error instanceof mongoose_1.Error ? error.message : error,
        });
    }
});
exports.deleteProduct = deleteProduct;
