import type { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateSchema = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
        res.status(400).json({
            message: 'Validation error',
            error: validationResult.error.errors.map((err) => err.message),
        });
        return;
    }
    req.body = validationResult.data;
    next();
};
