import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

const validateSchema =
    <T>(schema: ZodSchema<T>) =>
    (req: Request<unknown, unknown, T>, res: Response, next: NextFunction): void => {
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

export default validateSchema;
