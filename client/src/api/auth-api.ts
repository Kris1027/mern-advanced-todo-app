import { redirect } from '@tanstack/react-router';
import axios, { type AxiosResponse } from 'axios';
import type { UserProps } from '@/types/user-type';

interface AuthResponse {
    success: boolean;
    message: string;
    data: UserProps;
}

export const authApi = async (): Promise<AuthResponse | null> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axios.get('/api/auth/user');
        if (res.data) {
            return res.data;
        }
        throw redirect({ to: '/login' });
    } catch {
        throw redirect({ to: '/login' });
    }
};
