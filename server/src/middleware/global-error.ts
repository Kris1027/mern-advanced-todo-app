import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

const globalError: ErrorRequestHandler = (err: IErrorProps, _req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
    }
    next();
};

export default globalError;
