import type { Response } from 'express';

const successResponse = <T>(res: Response, status: number, message: string, data?: T): Response => {
    return res.status(status).json({ success: true, message, data });
};

export default successResponse;
