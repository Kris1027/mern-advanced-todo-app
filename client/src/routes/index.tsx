import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import { taskLoader } from '@/loaders/task-loader';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/')({
    component: HomePage,
    beforeLoad: auth,
    loader: taskLoader,
});
