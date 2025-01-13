import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import { authApi } from '@/api/auth-api';
import { taskLoader } from '@/api/task-loader';

export const Route = createFileRoute('/')({
    beforeLoad: authApi,
    component: HomePage,
    loader: taskLoader,
});
