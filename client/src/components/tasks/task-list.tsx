import { Info } from 'lucide-react';
import type { TaskProps } from '@/types/task-type';
import TaskItem from '@/components/tasks/task-item';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface TaskListProps {
    tasks: TaskProps[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className='space-y-4 w-full'>
            {tasks && tasks.map((task: TaskProps) => <TaskItem key={task._id} task={task} />)}
            {tasks && tasks.length === 0 && (
                <Alert className='flex flex-col items-center space-x-2'>
                    <Info />
                    <AlertTitle>No Tasks Available</AlertTitle>
                    <AlertDescription>
                        You have no tasks at the moment. Enjoy your free time!
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default TaskList;
