import LoadingSpinner from '@/components/loading-spinner';
import TaskItem from '@/components/task-item';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/')({
    component: HomePage,
    beforeLoad: async () => {
        try {
            const res = await axios.get('/api/auth/user');
            if (!res.data) {
                throw redirect({ to: '/login' });
            }
        } catch {
            throw redirect({ to: '/login' });
        }
    },
});

export interface TaskProps {
    _id: string;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

function HomePage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('/api/tasks');
            return res.data;
        },
    });

    return (
        <main className='p-10'>
            {isLoading && <LoadingSpinner size='xl' />}
            {isError && <p>{(error as Error).message}</p>}
            <ul className='flex justify-center flex-wrap gap-10'>
                {data &&
                    data.tasks.map((task: TaskProps) => <TaskItem key={task._id} task={task} />)}
                {data && data.tasks.length === 0 && (
                    <p>Nothing on your plate right now. Enjoy the moment!</p>
                )}
            </ul>
        </main>
    );
}
