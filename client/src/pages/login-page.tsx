import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { loginSchema } from '@/schemas/login-schema';
import LoadingSpinner from '@/components/loading-spinner';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof loginSchema>) => {
            const res = await axios.post('/api/auth/login', values);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            navigate({ to: '/' });
            reset();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message || 'An error occurred');
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        mutate(values);
    }
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
            <Logo size='md' />
            <div className='w-[300px]'>
                <h2 className='text-xl text-center py-4'>Stay Organized, Stay Productive</h2>
                <p className='text-sm text-center py-4 opacity-70'>
                    Access your tasks! Log in now!
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <Input
                        disabled={isPending}
                        type='text'
                        placeholder='username'
                        {...register('username', { required: true })}
                    />
                    {errors.username && (
                        <p className='text-xs text-red-500'>{errors.username.message}</p>
                    )}
                    <Input
                        disabled={isPending}
                        type='password'
                        placeholder='password'
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <p className='text-xs text-red-500'>{errors.password.message}</p>
                    )}
                    <Button disabled={isPending} size='fullWidth' type='submit'>
                        {isPending ? <LoadingSpinner size='xs' /> : <LogIn />}
                    </Button>
                </form>
                <p className='text-sm text-center py-4 opacity-70'>
                    Don’t have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='underline font-bold opacity-100 hover:text-blue-600'
                    >
                        Sign up here
                    </Link>{' '}
                    and start organizing your life!
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
