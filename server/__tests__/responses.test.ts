import { Response } from 'express';
import successResponse from '../src/utils/success-response.js';

const mockResponse = () => {
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    return res as Response;
};

describe('successResponse', () => {
    it('should return response with correct structure', () => {
        const res = mockResponse();
        const status = 200;
        const message = 'success';
        const data = { id: 1 };

        successResponse(res, status, message, data);

        expect(res.status).toHaveBeenCalledWith(status);
        expect(res.json).toHaveBeenCalledWith({
            status,
            message,
            data,
        });
    });
});
