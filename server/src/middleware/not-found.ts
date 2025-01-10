import HttpError from 'utils/http-error.js';
import type { NextFunction, Request, Response } from 'express';

const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
    next(new HttpError('Page not found', 404));
};

export default notFound;
