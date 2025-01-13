import { authUserLoader } from '@/loaders/auth-user-loader';
import { redirect } from '@tanstack/react-router';

export const auth = async () => {
    const authUser = await authUserLoader();
    if (!authUser) {
        throw redirect({ to: '/login' });
    }
    return authUser;
};
