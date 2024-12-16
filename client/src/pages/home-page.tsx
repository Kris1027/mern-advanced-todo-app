import { useLoaderData } from '@tanstack/react-router';
import TaskItem from '@/components/task-item';
import type { TaskProps } from '@/types/task-type';

const HomePage = () => {
    const { tasks } = useLoaderData({ from: '/' });

    return (
        <main className='p-10'>
            <ul className='flex justify-center flex-wrap gap-10'>
                {tasks && tasks.map((task: TaskProps) => <TaskItem key={task._id} task={task} />)}
                {tasks && tasks.length === 0 && (
                    <p>Nothing on your plate right now. Enjoy the moment!</p>
                )}
            </ul>
        </main>
    );
};

export default HomePage;
