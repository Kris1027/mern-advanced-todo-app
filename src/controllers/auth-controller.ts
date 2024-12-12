import type { NextFunction, Request, Response } from 'express';
import type { ErrorProps } from '../middleware/global-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername) {
            const error: ErrorProps = new Error('Username is already taken');
            error.status = 400;
            return next(error);
        }

        if (existingEmail) {
            const error: ErrorProps = new Error('Email address is already taken');
            error.status = 400;
            return next(error);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string);

            res.cookie('jwt', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
            });

            await newUser.save();
            res.status(201).json({ message: 'User created successfully', newUser });
        } else {
            const error: ErrorProps = new Error('Invalid user data');
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            const error: ErrorProps = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        const token = req.cookies.jwt;
        if (token) {
            const error: ErrorProps = new Error('User is already logged in');
            error.status = 401;
            return next(error);
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password || '');

        if (!isPasswordValid) {
            const error: ErrorProps = new Error('Invalid password');
            error.status = 404;
            return next(error);
        } else {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
            res.cookie('jwt', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
            });

            res.status(200).json({ message: 'User logged in successfully', user });
        }
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const error: ErrorProps = new Error('User is not logged in');
            error.status = 401;
            return next(error);
        }

        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        next(error);
    }
};
