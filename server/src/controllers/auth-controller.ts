import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from 'utils/http-error.js';
import cookieConfig from '../config/cookie-config.js';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { ILoginRequestBody, ISignupRequestBody } from 'types/auth-types.js';

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
            throw new HttpError('Username is already taken', 400);
        }

        if (existingEmail) {
            throw new HttpError('Email address is already taken', 400);
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
            throw new HttpError('User not found', 404);
        }

        let token: string | undefined = (req.cookies as Record<string, string>).jwt;
        if (token) {
            throw new HttpError('User is already logged in', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new HttpError('Invalid password', 401);
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
            throw new HttpError('No token found', 401);
        }

        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 404);
        }
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json({ message: 'User data fetched successfully', user });
    } catch (error) {
        next(error);
    }
};
