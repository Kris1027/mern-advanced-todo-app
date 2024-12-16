import { z } from 'zod';

export const createTaskSchema = z.object({
    user: z.string(),
    title: z
        .string()
        .trim()
        .min(3, 'Title must be at least 3 characters long')
        .max(30, 'Title can be a maximum 30 characters long'),
    text: z
        .string()
        .trim()
        .min(6, 'Text must be at least 6 characters long')
        .max(500, 'Text can be a maximum 500 characters long'),
});
