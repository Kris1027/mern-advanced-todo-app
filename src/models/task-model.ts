import mongoose, { Document } from 'mongoose';

interface TaskProps extends Document {
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new mongoose.Schema<TaskProps>(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
