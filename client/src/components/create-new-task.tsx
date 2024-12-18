import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTaskSchema } from '@/schemas/create-task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { authApi } from '@/api/auth-api';
import { toast } from '@/hooks/use-toast';
import InputError from '@/components/input-error';
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
            <DialogTrigger className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'>
                <PlusCircle />
                <span>Create</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>Create</DialogTitle>
                    <DialogDescription>New task</DialogDescription>
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
                                <PlusCircle />
                                <span>New task</span>
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewTask;
