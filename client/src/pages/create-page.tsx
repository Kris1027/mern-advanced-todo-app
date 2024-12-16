import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { createTaskSchema } from '@/schemas/create-task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useLoaderData({ from: '__root__' });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['createTask'],
        mutationFn: async (values: z.infer<typeof createTaskSchema>) => {
            const res = await axios.post('/api/tasks', values);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            reset();
            navigate({ to: '/' });
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

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        console.log(values);
        mutate(values);
    };

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type='hidden' {...register('user')} value={user._id} />
                <Input
                    disabled={isPending}
                    {...register('title')}
                    type='text'
                    placeholder='title'
                />
                {errors.title && <InputError>{errors.title.message}</InputError>}
                <Textarea disabled={isPending} {...register('text')} placeholder='text' />
                {errors.text && <InputError>{errors.text.message}</InputError>}
                <Button disabled={isPending} type='submit'>
                    Create new task
                </Button>
            </form>
        </main>
    );
};

export default CreatePage;
