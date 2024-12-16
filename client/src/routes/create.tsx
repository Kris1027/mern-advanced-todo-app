import { authApi } from '@/api/auth-api';
import CreatePage from '@/pages/create-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
    beforeLoad: authApi,
    component: CreatePage,
});
