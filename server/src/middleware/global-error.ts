import type { ErrorRequestHandler, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

const globalError: ErrorRequestHandler = (err: IErrorProps, req: Request, res: Response) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
    }
};

export default globalError;
