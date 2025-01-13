import { createFileRoute, ErrorComponent } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import { authApi } from '@/api/auth-api';
import { taskLoader } from '@/api/task-loader';
import LoadingSpinner from '@/components/ui/loading-spinner';

export const Route = createFileRoute('/')({
    beforeLoad: authApi,
    component: HomePage,
    loader: taskLoader,
    pendingComponent: () => <LoadingSpinner size='xl' />,
    errorComponent: ErrorComponent,
});
