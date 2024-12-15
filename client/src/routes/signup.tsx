import LoadingSpinner from '@/components/loading-spinner';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signupSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username can be a maximum 20 characters long'),
    email: z.string().email(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password can be a maximum 20 characters long'),
});

export const Route = createFileRoute('/signup')({
    component: SignupPage,
    beforeLoad: async () => {
        try {
            const res = await axios.get('/api/auth/user');
            if (res.data?.user) {
                throw redirect({ to: '/' });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                return null;
            } else {
                console.error('An unexpected error occurred:', error);
                throw error;
            }
        }
    },
});

function SignupPage() {
    const navigate = useNavigate({ from: '/login' });
    const { toast } = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof signupSchema>) => {
            const res = await axios.post('/api/auth/signup', values);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            navigate({ to: '/' });
            reset();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title:
                    error.response?.data?.message ||
                    error.message ||
                    'An unexpected error occurred',
                variant: 'destructive',
            });
        },
    });

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        mutate(values);
    }
    return (
        <main className='w-full flex gap-10 min-h-screen justify-center items-center'>
            <Logo size='md' />
            <div className='w-[300px]'>
                <h2 className='text-xl text-center py-4'>
                    Get started today and take control of your tasks!
                </h2>
                <p className='text-sm text-center py-4 opacity-70'>
                    Take the first step toward better productivity. Sign up now and gain full access
                    to all features!
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
                        type='text'
                        placeholder='email'
                        {...register('email', { required: true })}
                    />
                    {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
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
                        {isPending ? <LoadingSpinner size='xs' /> : <UserPlus />}
                    </Button>
                </form>
                <p className='text-sm text-center py-4 opacity-70'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='underline font-bold opacity-100 hover:text-blue-600'
                    >
                        Log in here
                    </Link>{' '}
                    and get back to organizing your life!
                </p>
            </div>
        </main>
    );
}
