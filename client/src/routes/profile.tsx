import { authApi } from '@/api/auth-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
    beforeLoad: authApi,
});

function ProfilePage() {
    const user = useLoaderData({ from: '__root__' });
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>You can change here your profile settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Input placeholder={user.user.username} />
                <Input placeholder={user.user.email} />
                <Button type='submit'>Save</Button>
            </CardContent>
        </Card>
    );
}
