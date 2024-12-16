import { redirect } from '@tanstack/react-router';
import axios, { type AxiosResponse } from 'axios';
import type { UserProps } from '@/types/user-type';

interface AuthProps {
    message: string;
    user: UserProps;
}

export const authApi = async (): Promise<AuthProps | null> => {
    try {
        const res: AxiosResponse<AuthProps> = await axios.get('/api/auth/user');
        if (res.data) {
            return res.data;
        } else {
            throw redirect({ to: '/login' });
        }
    } catch {
        throw redirect({ to: '/login' });
    }
};
