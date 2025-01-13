import { createFileRoute, redirect } from '@tanstack/react-router';
import ProfilePage from '@/pages/profile-page';
import { authUserLoader } from '@/loaders/auth-user-loader';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
    beforeLoad: async () => {
        const authUser = await authUserLoader();
        if (!authUser) {
            throw redirect({ to: '/login' });
        }
        return authUser;
    },
});
