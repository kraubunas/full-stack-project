import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import productsRouter from './routers/products-router';
import categoriesRouter from './routers/categories-router';
import authRouter from './routers/auth-router';
import config from './config';
import cartRouter from './routers/cart-router';

const server = express();

const { DB_CONNECTION_URL } = process.env;
if (DB_CONNECTION_URL === undefined) throw new Error('Set up environment DB_CONNECTION_URL variables!');

server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/products', productsRouter);
server.use('/api/categories', categoriesRouter);
server.use('/api/auth', authRouter);
server.use('/api/cart', cartRouter);

mongoose.connect(
    config.db.connectionUrl,
    {
        retryWrites: true,
        w: 'majority',
    },
    (error) => {
        if (error) {
            console.log(`Nepavyko prisijungti:\n${error.message}`);
            return;
        }
        console.log('Sekmingai prisijungta prie MongoDB');
        server.listen(1337, () => console.log('server is running on: http://localhost:1337'));
    },
);
