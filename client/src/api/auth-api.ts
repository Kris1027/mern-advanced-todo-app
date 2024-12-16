import { redirect } from '@tanstack/react-router';
import axios from 'axios';

export const authApi = async () => {
    try {
        const res = await axios.get('/api/auth/user');
        if (!res.data) {
            throw redirect({ to: '/login' });
        }
    } catch {
        throw redirect({ to: '/login' });
    }
};
