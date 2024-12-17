import mongoose, { Document, Types } from 'mongoose';

interface TaskProps extends Document {
    user: Types.ObjectId;
    title: string;
    text: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new mongoose.Schema<TaskProps>(
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
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
