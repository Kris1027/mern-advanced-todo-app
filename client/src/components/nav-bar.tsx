import LogoutButton from './logout-button';
import { ThemeModeToggle } from './theme-mode-toggle';

const Navbar = () => {
    return (
        <nav>
            <ThemeModeToggle />
            <LogoutButton />
        </nav>
    );
};

export default Navbar;
