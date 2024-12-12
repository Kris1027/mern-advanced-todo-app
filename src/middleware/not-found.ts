import type { NextFunction, Request, Response } from 'express';
import type { ErrorProps } from './global-error';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error: ErrorProps = new Error('Page not found');
    error.status = 404;
    next(error);
};

export default notFound;
