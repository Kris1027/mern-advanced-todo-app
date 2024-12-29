import mongoose from 'mongoose';
import type { IUserProps } from 'types/model-types.js';

const userSchema = new mongoose.Schema<IUserProps>(
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
