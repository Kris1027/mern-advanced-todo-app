import { z } from 'zod';

export const validateUser = z.object({
    username: z
        .string()
        .trim()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username can be a maximum 20 characters long'),
    email: z.string().email('Provided email address is invalid'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password can be a maximum 20 characters long'),
});