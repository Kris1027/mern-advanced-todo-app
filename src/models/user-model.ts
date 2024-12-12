import mongoose, { Document } from 'mongoose';

interface UserProps extends Document {
    username: string;
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
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
