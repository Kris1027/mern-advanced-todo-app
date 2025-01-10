import type { Response } from 'express';

const successResponse = (res: Response, status: number, message: string, data?: object): Response => {
    return res.status(status).json({ success: true, message, data });
};

export default successResponse;
