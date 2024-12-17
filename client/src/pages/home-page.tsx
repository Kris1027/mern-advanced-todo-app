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
        <div className='flex flex-col items-start w-full gap-4'>
            <CreateNewTask />
            {isLoading && <LoadingSpinner size='xl' />}
            {tasks && <TaskList tasks={tasks.tasks} />}
        </div>
    );
};

export default HomePage;
