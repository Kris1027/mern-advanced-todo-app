import { useQuery } from '@tanstack/react-query';
import CreateNewTask from '@/components/create-new-task';
import { taskApi } from '@/api/task-api';
import LoadingSpinner from '@/components/loading-spinner';
import TaskList from '@/components/task-list';

const HomePage: React.FC = () => {
    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: taskApi,
    });

    return (
        <main className='flex flex-col justify-center items-center gap-4'>
            <CreateNewTask />
            {isLoading && <LoadingSpinner size='xl' />}
            {tasks && <TaskList tasks={tasks.tasks} />}
        </main>
    );
};

export default HomePage;
