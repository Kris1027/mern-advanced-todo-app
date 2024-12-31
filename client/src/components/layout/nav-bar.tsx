import { Link } from '@tanstack/react-router';
import Logo from '@/components/ui/logo';
import LogoutButton from '@/components/ui/logout-button';
import ProfileImage from '@/components/ui/profile-image';
import ThemeModeToggle from '@/components/ui/theme-mode-toggle';

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
