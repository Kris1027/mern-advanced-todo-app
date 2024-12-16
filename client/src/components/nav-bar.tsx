import Logo from './logo';
import LogoutButton from './logout-button';
import ThemeModeToggle from './theme-mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from '@tanstack/react-router';

const Navbar: React.FC = () => {
    return (
        <nav className='flex justify-between p-4'>
            <Logo />
            <div className='flex gap-4'>
                <Avatar>
                    <Link to='/profile'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                    </Link>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ThemeModeToggle />
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
