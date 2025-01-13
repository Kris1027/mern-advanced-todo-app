import axios, { type AxiosResponse } from 'axios';
import type { UserProps } from '@/types/user-type';

interface AuthResponse {
    success: boolean;
    message: string;
    data: UserProps;
}

export const authUserLoader = async (): Promise<AuthResponse | null> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axios.get('/api/auth/user');
        return res.data;
    } catch {
        return null;
    }
};
