import { TaskProps } from '@/types/task-type';
import TaskItem from './task-item';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info } from 'lucide-react';

interface TaskListProps {
    tasks: TaskProps[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className='space-y-10'>
            {tasks && tasks.map((task: TaskProps) => <TaskItem key={task._id} task={task} />)}
            {tasks && tasks.length === 0 && (
                <Alert>
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
