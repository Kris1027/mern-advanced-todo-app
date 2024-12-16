import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import HomePage from '@/pages/home-page';
import { authApi } from '@/api/auth-api';
import { taskApi } from '@/api/task-api';
import LoadingSpinner from '@/components/loading-spinner';

export const Route = createFileRoute('/')({
    beforeLoad: authApi,
    loader: taskApi,
    component: () => (
        <Suspense fallback={<LoadingSpinner size='xl' />}>
            <HomePage />
        </Suspense>
    ),
});
