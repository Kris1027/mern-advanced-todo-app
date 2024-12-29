import type { NextFunction, Request, Response } from 'express';
import type { IErrorProps } from 'types/global.js';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error: IErrorProps = new Error('Page not found');
    error.status = 404;
    next(error);
};

export default notFound;
