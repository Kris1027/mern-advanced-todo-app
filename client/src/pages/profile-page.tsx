import { useLoaderData } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProfileImage from '@/components/profile-image';

const ProfilePage: React.FC = () => {
    const user = useLoaderData({ from: '__root__' });
    return (
        <Card className='w-full flex-grow-0'>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>You can change here your profile settings</CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-4 w-1/2 items-start'>
                    <Label htmlFor='profile-image'>Profile Image</Label>
                    <ProfileImage />
                    <Label htmlFor='username'>Username</Label>
                    <Input id='username' placeholder={user.user.username} />
                    <Label htmlFor='full-name'>Full Name</Label>
                    <Input id='full-name' placeholder={user.user.fullName} />
                    <Label>Email address</Label>
                    <Input id='email' placeholder={user.user.email} />
                    <div className='space-x-4'>
                        <Button type='submit'>Save</Button>
                        <Button variant='destructive' type='reset'>
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfilePage;
