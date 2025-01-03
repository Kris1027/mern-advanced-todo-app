import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieConfig from '../config/cookie-config.js';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { ILoginRequestBody, ISignupRequestBody } from 'types/auth-types.js';
import type { IErrorProps } from 'types/global.js';

export const signupUser = async (
    req: Request<object, object, ISignupRequestBody>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { username, fullName, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername) {
            const error: IErrorProps = new Error('Username is already taken');
            error.status = 400;
            next(error);
            return;
        }

        if (existingEmail) {
            const error: IErrorProps = new Error('Email address is already taken');
            error.status = 400;
            next(error);
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string);

            res.cookie('jwt', token, cookieConfig);

            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request<object, object, ILoginRequestBody>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            const error: IErrorProps = new Error('User not found');
            error.status = 404;
            next(error);
            return;
        }

        let token: string | undefined = (req.cookies as Record<string, string>).jwt;
        if (token) {
            const error: IErrorProps = new Error('User is already logged in');
            error.status = 401;
            next(error);
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error: IErrorProps = new Error('Invalid password');
            error.status = 401;
            next(error);
            return;
        }

        token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
        res.cookie('jwt', token, cookieConfig);

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = (_req: Request, res: Response, next: NextFunction): void => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        next(error);
    }
};

export const getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = (req.cookies as Record<string, string>).jwt;
        if (!token) {
            const error: IErrorProps = new Error('No token found');
            error.status = 401;
            next(error);
            return;
        }

        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 404;
            next(error);
            return;
        }
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json({ message: 'User data fetched successfully', user });
    } catch (error) {
        next(error);
    }
};
