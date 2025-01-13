import { useRouter } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, Loader } from 'lucide-react';
import type { TaskProps } from '@/types/task-type';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ToggleTaskProps {
    task: TaskProps;
}

const ToggleTask: React.FC<ToggleTaskProps> = ({ task }) => {
    const router = useRouter();

    const { mutate: toggleTaskCompletion, isPending: isCompleting } = useMutation({
        mutationKey: ['toggleTask'],
        mutationFn: async () => {
            const res = await axios.put(`/api/tasks/${task._id}/complete`);
            return res.data;
        },
        onSuccess: async (data) => {
            if (data.data.isComplete) {
                toast.success('Task completed');
            } else {
                toast.error('Task marked as incomplete');
            }
            await router.invalidate();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message || 'An error occurred');
        },
    });

    return (
        <Button onClick={() => toggleTaskCompletion()} variant='default'>
            {isCompleting ? (
                <LoadingSpinner size='xs' />
            ) : task.isComplete ? (
                <CheckCircle />
            ) : (
                <Loader className='animate-slower-spin' />
            )}
        </Button>
    );
};

export default ToggleTask;
