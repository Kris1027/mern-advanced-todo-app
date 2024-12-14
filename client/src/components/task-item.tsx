import { TaskProps } from '@/routes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, Clock, Pencil, Trash2 } from 'lucide-react';

const TaskItem = ({ task }: { task: TaskProps }) => {
    const formatDate = (date: Date) =>
        new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <Card className='w-[600px]'>
            <CardHeader className='text-center'>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                    <p>{task.text}</p>
                    <Button variant='default'>
                        <Check />
                    </Button>
                </div>
                <div className='space-x-4'>
                    <Button variant='secondary'>
                        <Pencil />
                    </Button>
                    <Button variant='destructive'>
                        <Trash2 />
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
