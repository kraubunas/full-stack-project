"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const category_model_1 = __importDefault(require("../models/category-model"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.find();
    res.status(200).json(categories);
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categories = yield category_model_1.default.findById(id);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(404).json({
            error: `Kateorija su id: '${id}' nerasta`,
        });
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryProps = req.body;
    try {
        const createdCategory = yield category_model_1.default.create(categoryProps);
        res.status(201).json(createdCategory);
    }
    catch (err) {
        res.status(400).json({ error: 'Serverio klaida kuriant kategorijas' });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryProps = req.body;
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid)
            throw new mongoose_1.Error(`Kategorija su id: '${id}' nerasta`);
        const updatedCategory = yield category_model_1.default.findByIdAndUpdate(id, categoryProps, {
            new: true,
        });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({
            error: 'Serverio klaida atnaujinant kategorija'
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield category_model_1.default.findByIdAndDelete(id);
        if (deletedCategory === null)
            throw new mongoose_1.Error(`Kategorija su id: '${id}' nerasta`);
        res.status(200).json({
            msg: `Kategorija sekmingai istrintas`,
            product: deletedCategory
        });
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof mongoose_1.Error ? error.message : 'Serverio klaida trinant kategorija',
        });
    }
});
exports.deleteCategory = deleteCategory;
