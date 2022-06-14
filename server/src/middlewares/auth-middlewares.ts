import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user-model';

type DecodedInfo = { email: string, role: 'admin' | 'user', iat?: number };

 export const authMiddleWare: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader === undefined) throw new Error('You must be logged in');

        const token = authHeader.split(' ')[1];
        if (token === undefined) throw new Error('Klaidingi atpazinimo duomenys');

        const decodedInfo = jwt.verify(token, config.token.secret) as DecodedInfo;

        req.tokenData = {
            email: decodedInfo.email,
            role: decodedInfo.role,
            token,
        };

        next();
    } catch (error) {
        res.status(401).json({
            error: error instanceof Error ? error.message : 'Klaida atpazistatnt vartotoja',
        });
    }
};

export const userMiddleware: RequestHandler = async (req, res, next) => {
    if (req.tokenData === undefined) {
        res.status(401).json({
            error: 'Reikalingas prisijungimas',
        });
        return;
    }
    const authUser = await UserModel.findOne({ email: req.tokenData.email });

    if (authUser === null) {
        res.status(404).json({
            error: 'Autentifikuojamas vartotojas nerastas',
        });
        return;
    }

    req.authUser = authUser;

    next();
};
export const adminMiddleware: RequestHandler = async (req, res, next) => {
    if (req.tokenData === undefined) {
        res.status(401).json({
            error: 'Reikalingas prisijungimas',
        });
        return;
    }

    if (req.tokenData.role !== 'admin') {
        res.status(401).json({
            error: 'Veiksmas leidziamas tik adminui',
        });
    }

    next();
};
