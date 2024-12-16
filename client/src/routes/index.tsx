import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/pages/home-page';
import { authApi } from '@/api/auth-api';

export const Route = createFileRoute('/')({
    beforeLoad: authApi,
    component: HomePage,
});
