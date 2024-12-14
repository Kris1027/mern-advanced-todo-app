import Logo from './logo';
import LogoutButton from './logout-button';
import { ThemeModeToggle } from './theme-mode-toggle';

const Navbar = () => {
    return (
        <nav className='flex justify-between p-4'>
            <Logo />
            <div className='space-x-4'>
                <ThemeModeToggle />
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
