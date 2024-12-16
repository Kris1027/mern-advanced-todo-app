import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileImage: React.FC = () => {
    return (
        <Avatar id='profile-image'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>PI</AvatarFallback>
        </Avatar>
    );
};

export default ProfileImage;
