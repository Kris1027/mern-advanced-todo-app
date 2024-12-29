import Task from '../models/task-model.js';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';
import type { ITaskRequestBody } from 'types/task-types.js';

export const createTask = async (
    req: Request<object, object, ITaskRequestBody>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            const error: IErrorProps = new Error('Inputs cannot be empty');
            error.status = 400;
            next(error);
            return;
        }

        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 401;
            next(error);
            return;
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
        }
    } catch (error) {
        next(error);
    }
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 401;
            next(error);
            return;
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            const error: IErrorProps = new Error('User not found');
            error.status = 404;
            next(error);
            return;
        }

        const tasks = await Task.find({ user });
        res.status(200).json({
            message:
                tasks.length > 0 ? `Tasks of ${user.username} fetched successfully` : `${user.username} have no tasks`,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            const error: IErrorProps = new Error('Task not found');
            error.status = 404;
            next(error);
            return;
        }

        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 401;
            next(error);
            return;
        }

        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) {
            const error: IErrorProps = new Error('User not found');
            error.status = 404;
            next(error);
            return;
        }

        if (task.user.toString() !== userId) {
            const error: IErrorProps = new Error('Not authorized to delete this task');
            error.status = 401;
            next(error);
            return;
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: Request<{ id: string }, object, ITaskRequestBody>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { title, text } = req.body;
        if (!title || !text) {
            const error: IErrorProps = new Error('Inputs cannot be empty');
            error.status = 400;
            next(error);
            return;
        }

        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 401;
            next(error);
            return;
        }

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            const error: IErrorProps = new Error('User not found');
            error.status = 404;
            next(error);
            return;
        }
        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            const error: IErrorProps = new Error('Task not found');
            error.status = 404;
            next(error);
            return;
        }

        if (task.user.toString() !== userId.toString()) {
            const error: IErrorProps = new Error('Not authorized to update this task');
            error.status = 401;
            next(error);
            return;
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

export const toggleTaskCompletion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user._id) {
            const error: IErrorProps = new Error('User not logged in');
            error.status = 401;
            next(error);
            return;
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            const error: IErrorProps = new Error('User not found');
            error.status = 404;
            next(error);
            return;
        }

        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            const error: IErrorProps = new Error('Task not found');
            error.status = 404;
            next(error);
            return;
        }

        if (task.user.toString() !== userId.toString()) {
            const error: IErrorProps = new Error('Not authorized to update this task');
            error.status = 401;
            next(error);
            return;
        }

        const update = {
            isComplete: !task.isComplete,
        };

        task = await Task.findByIdAndUpdate(taskId, update);
        const updatedTask = await Task.findById(taskId);
        res.status(200).json({
            message: updatedTask?.isComplete ? 'Task marked as completed' : 'Task marked as incomplete',
            updatedTask,
        });
    } catch (error) {
        next(error);
    }
};
