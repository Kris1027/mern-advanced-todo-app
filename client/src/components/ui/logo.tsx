import { Link } from '@tanstack/react-router';

const logoSizes = {
    sm: 'w-24',
    md: 'w-80',
};

interface LogoProps {
    size?: keyof typeof logoSizes;
}

const Logo: React.FC<LogoProps> = ({ size = 'sm' }) => {
    return (
        <Link to='/'>
            <img src='/logo.png' alt='app logo' className={`${logoSizes[size]} rounded-full`} />
        </Link>
    );
};

export default Logo;
