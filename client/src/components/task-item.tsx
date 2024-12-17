import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CheckCircle, Clock, Loader, Pencil } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { TaskProps } from '@/types/task-type';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditTask from '@/components/edit-task';
import AlertModal from '@/components/alert-modal';
import LoadingSpinner from '@/components/loading-spinner';

export interface TaskItemProps {
    task: TaskProps;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const queryClient = useQueryClient();
    const { mutate: deleteTask, isPending: isDeleting } = useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: async () => {
            const res = await axios.delete(`/api/tasks/${task._id}`);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const { mutate: toggleTaskCompletion, isPending: isCompleting } = useMutation({
        mutationKey: ['toggleCompleteTask'],
        mutationFn: async () => {
            const res = await axios.put(`/api/tasks/${task._id}/complete`);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

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
                    <Button onClick={() => toggleTaskCompletion()} variant='default'>
                        {isCompleting ? (
                            <LoadingSpinner size='xs' />
                        ) : task.isComplete ? (
                            <CheckCircle />
                        ) : (
                            <Loader className='animate-slower-spin' />
                        )}
                    </Button>
                    {!task.isComplete && <EditTask task={task} />}
                    <AlertModal deleteTask={deleteTask} isDeleting={isDeleting} />
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
