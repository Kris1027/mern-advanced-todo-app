import { Link } from '@tanstack/react-router';

const logoSizes = {
    sm: 'w-24',
    md: 'w-80',
};

const Logo = ({ size = 'sm' }: { size?: keyof typeof logoSizes }) => {
    return (
        <Link to='/'>
            <img src='/logo.png' alt='app logo' className={`${logoSizes[size]} rounded-full`} />
        </Link>
    );
};

export default Logo;
