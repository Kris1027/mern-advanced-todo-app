import type { TaskProps } from '@/types/task-type';
import { formatDate } from '@/lib/utils';
import { CheckCircle, Clock, Pencil } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EditTask from '@/components/tasks/edit-task';
import ToggleTask from '@/components/tasks/toggle-task';
import DeleteTask from '@/components/tasks/delete-task';

export interface TaskItemProps {
    task: TaskProps;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle
                    className={`text-2xl flex justify-center items-center gap-4 ${task.isComplete ? 'opacity-20' : ''}`}
                >
                    {task.isComplete && <CheckCircle />}
                    {task.title}
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <pre
                    className={`whitespace-pre-wrap bg-muted p-4 rounded-md ${task.isComplete ? 'opacity-20' : ''}`}
                >
                    {task.text}
                </pre>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <div className='flex gap-4 items-center'>
                    <ToggleTask task={task} />
                    {!task.isComplete && <EditTask task={task} />}
                    <DeleteTask task={task} />
                </div>
                <div className='text-xs text-center opacity-50 flex-col items-start'>
                    <div className='flex items-center gap-2'>
                        <Clock size={12} />
                        <span>Created: {formatDate(task.createdAt)}</span>
                    </div>
                    {task.createdAt !== task.updatedAt && (
                        <div className='flex items-center gap-2 mt-1'>
                            {task.isComplete ? <CheckCircle size={12} /> : <Pencil size={12} />}
                            <span>
                                {task.isComplete ? 'Completed:' : 'Updated:'}{' '}
                                {formatDate(task.updatedAt)}
                            </span>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
