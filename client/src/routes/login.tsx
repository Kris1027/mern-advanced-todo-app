import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username can be a maximum 20 characters long'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password can be a maximum 20 characters long'),
});

export const Route = createFileRoute('/login')({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate({ from: '/login' });
    const { toast } = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');

            reset();
            navigate({ to: '/' });
            toast({ title: data.message, variant: 'positive' });
        } catch (error) {
            toast({ title: (error as Error).message, variant: 'destructive' });
            console.error('Login failed', (error as Error).message);
        }
    }
    return (
        <main className='w-full flex gap-10 min-h-screen justify-center items-center'>
            <img src='/logo.png' alt='app logo' className='w-80 rounded-full' />
            <div className='w-[300px]'>
                <h2 className='text-xl text-center py-4'>Stay Organized, Stay Productive</h2>
                <p className='text-sm text-center py-4 opacity-70'>
                    Access your tasks! Log in now!
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <Input
                        type='text'
                        placeholder='username'
                        {...register('username', { required: true })}
                    />
                    {errors.username && (
                        <p className='text-xs text-red-500'>{errors.username.message}</p>
                    )}
                    <Input
                        type='password'
                        placeholder='password'
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <p className='text-xs text-red-500'>{errors.password.message}</p>
                    )}
                    <Button size='fullWidth' type='submit'>
                        Login
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
        </main>
    );
}
