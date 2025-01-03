interface InputErrorProps {
    children: React.ReactNode;
}

const InputError: React.FC<InputErrorProps> = ({ children }) => {
    return <p className='text-xs px-2 text-red-500'>{children}</p>;
};

export default InputError;
