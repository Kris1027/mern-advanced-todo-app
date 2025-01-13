import { createFileRoute, redirect } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import { taskLoader } from '@/loaders/task-loader';
import { authUserLoader } from '@/loaders/auth-user-loader';

export const Route = createFileRoute('/')({
    component: HomePage,
    loader: taskLoader,
    beforeLoad: async () => {
        const authUser = await authUserLoader();
        if (!authUser) {
            throw redirect({ to: '/login' });
        }
        return authUser;
    },
});
