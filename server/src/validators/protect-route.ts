import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

interface JwtPayloadWithUserIdProps extends jwt.JwtPayload {
    userId: string;
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const error: IErrorProps = new Error('Unauthorized: No token provided');
            error.status = 401;
            return next(error);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadWithUserIdProps;
        if (!decoded) {
            const error: IErrorProps = new Error('Unauthorized: Invalid token');
            error.status = 401;
            return next(error);
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            const error: IErrorProps = new Error('Unauthorized: User not found');
            error.status = 401;
            return next(error);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
