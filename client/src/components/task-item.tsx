import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Check, Clock, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { TaskProps } from '@/types/task-type';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditTask from '@/components/edit-task';
import LoadingSpinner from '@/components/loading-spinner';

export interface TaskItemProps {
    task: TaskProps;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const queryClient = useQueryClient();
    const { mutate: deleteTask, isPending } = useMutation({
        mutationKey: ['tasks'],
        mutationFn: async () => {
            const res = await axios.delete(`/api/tasks/${task._id}`);
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return (
        <Card className='w-[600px]'>
            <CardHeader className='text-center'>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <pre className='whitespace-pre-wrap'>{task.text}</pre>
                <div className='space-x-4'>
                    <Button variant='default'>
                        <Check />
                    </Button>
                    <EditTask task={task} />
                    <Button onClick={() => deleteTask()} variant='destructive'>
                        {isPending ? <LoadingSpinner size='xs' /> : <Trash2 />}
                    </Button>
                </div>
            </CardContent>
            <CardFooter className='text-xs text-center opacity-50 flex-col items-start'>
                <div className='flex items-center gap-2'>
                    <Clock size={12} />
                    <span>Created: {formatDate(task.createdAt)}</span>
                </div>
                {task.createdAt !== task.updatedAt && (
                    <div className='flex items-center gap-2 mt-1'>
                        <Pencil size={12} />
                        <span>Updated: {formatDate(task.updatedAt)}</span>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
