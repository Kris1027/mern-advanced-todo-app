import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import axios, { type AxiosError } from 'axios';
import toast from 'react-hot-toast';
import type { TaskProps } from '@/types/task-type';
import AlertModal from '@/components/ui/alert-modal';

interface DeleteTaskProps {
    task: TaskProps;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task }) => {
    const router = useRouter();

    const { mutate: deleteTask, isPending: isDeleting } = useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: async () => {
            const res = await axios.delete(`/api/tasks/${task._id}`);
            return res.data;
        },
        onSuccess: async (data) => {
            toast.error(data.message);
            await router.invalidate();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message || 'An error occurred');
        },
    });

    return <AlertModal deleteTask={deleteTask} isDeleting={isDeleting} />;
};

export default DeleteTask;
