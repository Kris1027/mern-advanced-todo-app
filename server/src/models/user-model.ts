import mongoose from 'mongoose';
import type { Document } from 'mongoose';

interface UserProps extends Document {
    username: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserProps;
        }
    }
}

const userSchema = new mongoose.Schema<UserProps>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
