import { useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { createTaskSchema } from '@/schemas/create-task-schema';
import InputError from '@/components/ui/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { TaskItemProps } from '@/components/tasks/task-item';

const EditTask: React.FC<TaskItemProps> = ({ task }) => {
    const user = useLoaderData({ from: '__root__' });
    const userId = user?.data._id;

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
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
            toast.success(data.message);
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message || 'An error occurred');
        },
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        mutate(values);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2'>
                <Pencil />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>Edit</DialogTitle>
                    <DialogDescription>Current task</DialogDescription>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <Input type='hidden' {...register('user')} value={userId} />
                        <Input
                            disabled={isPending}
                            {...register('title')}
                            type='text'
                            placeholder='title'
                        />
                        {errors.title && <InputError>{errors.title.message}</InputError>}
                        <Textarea
                            rows={10}
                            disabled={isPending}
                            {...register('text')}
                            placeholder='text'
                        />
                        {errors.text && <InputError>{errors.text.message}</InputError>}
                        <div className='flex gap-4 justify-between'>
                            <DialogClose asChild>
                                <Button type='reset' onClick={() => reset()} variant='secondary'>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isPending} type='submit'>
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditTask;
