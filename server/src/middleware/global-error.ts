import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

const globalError: ErrorRequestHandler = (err: IErrorProps, _req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status ?? 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });

    next(err);
};

export default globalError;
