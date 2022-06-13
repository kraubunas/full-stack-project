"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products-controller");
const index_1 = require("../controllers/products-controller/index");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/', products_controller_1.getProducts);
productsRouter.get('/:id', products_controller_1.getProduct);
productsRouter.post('/', products_controller_1.createProduct);
productsRouter.patch('/:id', index_1.updateProduct);
productsRouter.delete('/:id', products_controller_1.deleteProduct);
exports.default = productsRouter;
