import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user-model';
import config from '../config';

type AuthBody = { email?: string, password?: string };

export const register: RequestHandler<unknown, unknown, AuthBody> = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) throw new Error('Privalomas email\'as');
        if (!password) throw new Error('Privalomas slaptazodis');

        const hashedPassword = bcrypt.hashSync(password, 5);

        const createdUser = await UserModel.create({ email, password: hashedPassword });
        const token = jwt.sign({ email, role: createdUser.role }, config.token.secret);

        res.status(201).json({
            user: createdUser,
            token: `Bearer ${token}`,
        });
    } catch (error) {
        let message;

        if (error instanceof Error.ValidationError) {
            if (error.errors.email) {
                message = 'Toks pastas jau yra';
            }
        } else if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Serverio klaida registruojantis';
        }
        res.status(400).json({
            error: message,
        });
    }
};

export const login: RequestHandler<unknown, unknown, AuthBody> = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) throw new Error('Privalomas email\'as');
        if (!password) throw new Error('Privalomas slaptazodis');

        const user = await UserModel.findOne({ email });

        if (user === null) throw new Error(`Vartotojas su pastu: '${email}' nerastas`);

        const passwordIsCorrect = bcrypt.compareSync(password, user.password);

        if (!passwordIsCorrect) throw new Error('Slaptazodis neteisingas');

        const token = jwt.sign({ email, role: user.role }, config.token.secret);

        res.status(200).json({
            user,
            token: `Bearer ${token}`,
        });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Serverio klaida sujungiant',
        });
    }
};
