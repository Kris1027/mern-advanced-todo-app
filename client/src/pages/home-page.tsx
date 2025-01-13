import CreateNewTask from '@/components/tasks/new-task';
import TaskList from '@/components/tasks/task-list';
import { useLoaderData } from '@tanstack/react-router';

const HomePage: React.FC = () => {
    const { data: tasks } = useLoaderData({ from: '/' });

    return (
        <div className='flex flex-col items-start w-full gap-4'>
            <CreateNewTask />
            {tasks && <TaskList tasks={tasks} />}
        </div>
    );
};

export default HomePage;
