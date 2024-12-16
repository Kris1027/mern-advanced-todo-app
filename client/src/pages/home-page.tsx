import { useQuery } from '@tanstack/react-query';
import type { TaskProps } from '@/types/task-type';
import TaskItem from '@/components/task-item';
import CreateNewTask from '@/components/create-new-task';
import { taskApi } from '@/api/task-api';
import LoadingSpinner from '@/components/loading-spinner';

const HomePage: React.FC = () => {
    const { data: tasks, isLoading } = useQuery({ queryKey: ['tasks'], queryFn: taskApi });

    return (
        <main className='p-10'>
            <CreateNewTask />
            {isLoading && <LoadingSpinner size='xl' />}
            <ul className='flex justify-center flex-wrap gap-10'>
                {tasks &&
                    tasks.tasks.map((task: TaskProps) => <TaskItem key={task._id} task={task} />)}
                {tasks && tasks.tasks.length === 0 && (
                    <p>Nothing on your plate right now. Enjoy the moment!</p>
                )}
            </ul>
        </main>
    );
};

export default HomePage;
