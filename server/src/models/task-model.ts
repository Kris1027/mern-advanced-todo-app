import mongoose from 'mongoose';
import type { ITaskProps } from 'types/model-types.js';

const taskSchema = new mongoose.Schema<ITaskProps>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        isComplete: {
            type: Boolean,
            required: false,
        },
    },
    { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
