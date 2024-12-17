import type { NextFunction, Request, Response } from 'express';
import type { ErrorProps } from '../middleware/global-error';
import Task from '../models/task-model';
import User from '../models/user-model';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            const error: ErrorProps = new Error('Inputs cannot be empty');
            error.status = 400;
            return next(error);
        }

        if (!req.user || !req.user._id) {
            const error: ErrorProps = new Error('User not logged in');
            error.status = 401;
            return next(error);
        }

        const newTask = new Task({
            user: req.user._id,
            title,
            text,
            isComplete: false,
        });

        if (newTask) {
            await newTask.save();
            res.status(201).json({ message: 'Task created successfully', newTask });
        } else {
            const error: ErrorProps = new Error('Invalid task data');
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        next(error);
    }
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user._id) {
            const error: ErrorProps = new Error('User not logged in');
            error.status = 401;
            return next(error);
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            const error: ErrorProps = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        const tasks = await Task.find({ user: user });
        res.status(200).json({
            message:
                tasks.length > 0
                    ? `Tasks of ${user.username} fetched successfully`
                    : `${user.username} have no tasks`,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            const error: ErrorProps = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        if (!req.user || !req.user._id) {
            const error: ErrorProps = new Error('User not logged in');
            error.status = 401;
            return next(error);
        }

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            const error: ErrorProps = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        if (task.user.toString() !== userId.toString()) {
            const error: ErrorProps = new Error('Not authorized to delete this task');
            error.status = 401;
            return next(error);
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, text } = req.body;
        if (!title || !text) {
            const error: ErrorProps = new Error('Inputs cannot be empty');
            error.status = 400;
            return next(error);
        }

        if (!req.user || !req.user._id) {
            const error: ErrorProps = new Error('User not logged in');
            error.status = 401;
            return next(error);
        }

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            const error: ErrorProps = new Error('User not found');
            error.status = 404;
            return next(error);
        }
        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            const error: ErrorProps = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        if (task.user.toString() !== userId.toString()) {
            const error: ErrorProps = new Error('Not authorized to update this task');
            error.status = 401;
            return next(error);
        }

        const update = {
            title,
            text,
        };

        task = await Task.findByIdAndUpdate(taskId, update);
        const updatedTask = await Task.findById(taskId);
        res.status(200).json({
            message: `Task of ${user.username} updated successfully`,
            updatedTask,
        });
    } catch (error) {
        next(error);
    }
};

export const toggleTaskCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user._id) {
            const error: ErrorProps = new Error('User not logged in');
            error.status = 401;
            return next(error);
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            const error: ErrorProps = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            const error: ErrorProps = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        if (task.user.toString() !== userId.toString()) {
            const error: ErrorProps = new Error('Not authorized to update this task');
            error.status = 401;
            return next(error);
        }

        const update = {
            isComplete: !task.isComplete,
        };

        task = await Task.findByIdAndUpdate(taskId, update);
        const updatedTask = await Task.findById(taskId);
        res.status(200).json({
            message: updatedTask?.isComplete
                ? 'Task marked as completed'
                : 'Task marked as incomplete',
            updatedTask,
        });
    } catch (error) {
        next(error);
    }
};
