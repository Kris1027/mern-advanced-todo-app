import type { Document, Types } from 'mongoose';

export interface ITaskProps extends Document {
    user: Types.ObjectId;
    title: string;
    text: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserProps extends Document {
    username: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

declare module 'express' {
    interface Request {
        user?: IUserProps;
    }
}
