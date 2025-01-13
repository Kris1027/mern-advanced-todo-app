import { useLoaderData } from '@tanstack/react-router';
import CreateTask from '@/components/tasks/create-task';
import TaskList from '@/components/tasks/task-list';

const HomePage: React.FC = () => {
    const { data: tasks } = useLoaderData({ from: '/' });

    return (
        <div className='flex flex-col items-start w-full gap-4'>
            <CreateTask />
            {tasks && <TaskList tasks={tasks} />}
        </div>
    );
};

export default HomePage;
