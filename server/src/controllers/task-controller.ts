import HttpError from 'utils/http-error.js';
import successResponse from 'utils/success-response.js';
import Task from '../models/task-model.js';
import User from '../models/user-model.js';
import type { NextFunction, Request, Response } from 'express';
import type { ITaskRequestBody } from 'types/task-types.js';

export const createTask = async (
    req: Request<object, object, ITaskRequestBody>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            throw new HttpError('Inputs cannot be empty', 400);
        }

        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 401);
        }

        const newTask = new Task({
            user: req.user._id,
            title,
            text,
            isComplete: false,
        });

        if (newTask) {
            await newTask.save();
            successResponse(res, 201, 'Task created successfully', newTask);
        }
    } catch (error) {
        next(error);
    }
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 401);
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        const tasks = await Task.find({ user });
        successResponse(res, 200, 'Tasks fetched successfully', tasks);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 401);
        }

        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        if (task.user.toString() !== userId) {
            throw new HttpError('Not authorized to delete this task', 401);
        }

        await Task.findByIdAndDelete(req.params.id);
        successResponse(res, 200, 'Task deleted successfully');
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
            throw new HttpError('Inputs cannot be empty', 400);
        }

        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 401);
        }

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            throw new HttpError('User not found', 404);
        }
        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        if (task.user.toString() !== userId.toString()) {
            throw new HttpError('Not authorized to update this task', 401);
        }

        const update = {
            title,
            text,
        };

        task = await Task.findByIdAndUpdate(taskId, update);
        const updatedTask = await Task.findById(taskId);
        successResponse(res, 200, 'Task updated successfully', updatedTask);
    } catch (error) {
        next(error);
    }
};

export const toggleTaskCompletion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user._id) {
            throw new HttpError('User not logged in', 401);
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            throw new HttpError('User not found', 404);
        }

        const taskId = req.params.id;
        let task = await Task.findById(taskId);
        if (!task) {
            throw new HttpError('Task not found', 404);
        }

        if (task.user.toString() !== userId.toString()) {
            throw new HttpError('Not authorized to update this task', 401);
        }

        const update = {
            isComplete: !task.isComplete,
        };

        task = await Task.findByIdAndUpdate(taskId, update);
        const updatedTask = await Task.findById(taskId);
        successResponse(res, 200, 'Task updated successfully', updatedTask);
    } catch (error) {
        next(error);
    }
};
