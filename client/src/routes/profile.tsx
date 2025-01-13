import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '@/pages/profile-page';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
    beforeLoad: auth,
});
