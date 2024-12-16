import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Pencil } from 'lucide-react';
import { createTaskSchema } from '@/schemas/create-task-schema';
import { authApi } from '@/api/auth-api';
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
import type { TaskItemProps } from '@/components/task-item';

const EditTask: React.FC<TaskItemProps> = ({ task }) => {
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
        formState: { errors },
    } = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: task.title,
            text: task.text,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['createTask'],
        mutationFn: async (values: z.infer<typeof createTaskSchema>) => {
            const res = await axios.put(`/api/tasks/${task._id}`, values);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
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
            <DialogTrigger>
                <Pencil />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>Edit task</DialogDescription>
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
                            Save
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditTask;
