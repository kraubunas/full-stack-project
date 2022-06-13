"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const products_router_1 = __importDefault(require("./routers/products-router"));
const categories_router_1 = __importDefault(require("./routers/categories-router"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)(':method :url :status'));
server.use(express_1.default.static('public'));
server.use(express_1.default.json());
server.use('/api/products', products_router_1.default);
server.use('/api/categories', categories_router_1.default);
mongoose_1.default.connect('mongodb+srv://admin:admin@database.majf8j0.mongodb.net/?retryWrites=true&w=majority', {
    retryWrites: true,
    w: 'majority',
}, (error) => {
    if (error) {
        console.log(`Nepavyko prisijungti:\n${error.message}`);
        return;
    }
    console.log('Sekmingai prisijungta prie MongoDB');
    server.listen(1337, () => console.log('server is running on: http://localhost:1337'));
});
