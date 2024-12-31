import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import axios, { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import { signupSchema } from '@/schemas/signup-schema';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';

const SignupPage: React.FC = () => {
    const navigate = useNavigate();

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
            toast.success(data.message);
            navigate({ to: '/' });
            reset();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message || 'An error occurred');
        },
    });

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        mutate(values);
    }
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
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
                    {errors.username && <InputError>{errors.username.message}</InputError>}
                    <Input
                        disabled={isPending}
                        type='text'
                        placeholder='full name'
                        {...register('fullName', { required: true })}
                    />
                    {errors.fullName && <InputError>{errors.fullName.message}</InputError>}
                    <Input
                        disabled={isPending}
                        type='text'
                        placeholder='email'
                        {...register('email', { required: true })}
                    />
                    {errors.email && <InputError>{errors.email.message}</InputError>}
                    <Input
                        disabled={isPending}
                        type='password'
                        placeholder='password'
                        {...register('password', { required: true })}
                    />
                    {errors.password && <InputError>{errors.password.message}</InputError>}
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
        </div>
    );
};

export default SignupPage;
