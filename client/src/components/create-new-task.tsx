import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { createTaskSchema } from '@/schemas/create-task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { authApi } from '@/api/auth-api';

const CreateNewTask: React.FC = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['authUser'],
        queryFn: authApi,
    });

    const userId = data?.user._id;

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
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
        mutate(values);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='group relative inline-flex items-center px-4 py-2 border-2 border-transparent bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-xl text-sm font-semibold w-52'>
                <span className='absolute inset-0 bg-white bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                <Plus className='mr-2 h-4 w-4 transform group-hover:rotate-90 transition-transform duration-300' />
                Create New Task
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New task</DialogTitle>
                    <DialogDescription>Create new task</DialogDescription>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input type='hidden' {...register('user')} value={userId} />
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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewTask;
