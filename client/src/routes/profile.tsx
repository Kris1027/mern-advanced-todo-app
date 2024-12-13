import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
});

function ProfilePage() {
    return <div>Hello "/profile"!</div>;
}
