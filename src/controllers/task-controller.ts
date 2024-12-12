import type { NextFunction, Request, Response } from 'express';
import type { ErrorProps } from '../middleware/global-error';
import Task from '../models/task-model';

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
            error.status = 404;
            return next(error);
        }

        const newTask = new Task({
            user: req.user._id,
            title,
            text,
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
