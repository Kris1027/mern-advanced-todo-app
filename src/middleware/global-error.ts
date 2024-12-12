import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

interface ErrorProps extends Error {
    status?: number;
}

const globalError: ErrorRequestHandler = (
    err: ErrorProps,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
    }
};

export default globalError;
