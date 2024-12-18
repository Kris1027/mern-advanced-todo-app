import { z } from 'zod';

export const signupSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username can be a maximum 20 characters long'),
    fullName: z
        .string()
        .min(6, 'Full name must be at least 3 characters long')
        .max(40, 'Full name can be a maximum 40 characters long'),
    email: z.string().email(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password can be a maximum 20 characters long'),
});
