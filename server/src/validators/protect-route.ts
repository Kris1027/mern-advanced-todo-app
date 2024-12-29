import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

interface IRequestWithCookies extends Request {
    cookies: {
        jwt?: string;
    };
}

interface IJwtPayloadWithUserIdProps extends jwt.JwtPayload {
    userId: string;
}

const protectRoute = async (req: IRequestWithCookies, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const error: IErrorProps = new Error('Unauthorized: No token provided');
            error.status = 401;
            next(error);
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayloadWithUserIdProps;
        if (!decoded) {
            const error: IErrorProps = new Error('Unauthorized: Invalid token');
            error.status = 401;
            next(error);
            return;
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            const error: IErrorProps = new Error('Unauthorized: User not found');
            error.status = 401;
            next(error);
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default protectRoute;
