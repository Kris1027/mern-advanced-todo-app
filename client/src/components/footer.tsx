const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <footer className='py-4 mt-4 w-full text-center text-sm bg-secondary rounded-t-md'>
            <p>
                ©{date} All rights reserved. Designed & crafted with love by{' '}
                <a
                    href='https://www.linkedin.com/in/krzysztof-obarzanek/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline font-medium'
                >
                    kris1027
                </a>
            </p>
        </footer>
    );
};

export default Footer;
