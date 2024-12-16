import Logo from '@/components/logo';
import LogoutButton from '@/components/logout-button';
import ProfileImage from '@/components/profile-image';
import ThemeModeToggle from '@/components/theme-mode-toggle';
import { Link } from '@tanstack/react-router';

const Navbar: React.FC = () => {
    return (
        <nav className='flex justify-between p-4'>
            <Logo />
            <div className='flex gap-4'>
                <Link to='/profile'>
                    <ProfileImage />
                </Link>
                <ThemeModeToggle />
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
