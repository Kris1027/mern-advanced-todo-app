interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({ size = 'sm', className = '' }) => {
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
    };

    return (
        <main className='w-full h-screen flex justify-center items-center'>
            <div
                className={`
            animate-spin
            border-2
            border-t-foreground
            border-l-foreground
            border-b-transparent
            border-r-transparent
            rounded-full
            ${sizeClasses[size]}
            ${className}
          `}
            />
        </main>
    );
};

export default LoadingSpinner;
