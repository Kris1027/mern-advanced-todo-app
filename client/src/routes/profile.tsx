import { createFileRoute } from '@tanstack/react-router';
import { authApi } from '@/api/auth-api';
import ProfilePage from '@/pages/profile-page';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
    beforeLoad: authApi,
});
