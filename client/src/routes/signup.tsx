import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
    component: SignupPage,
});

function SignupPage() {
    return <div>Hello "/signup"!</div>;
}
