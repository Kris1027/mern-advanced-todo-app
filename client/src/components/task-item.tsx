import { TaskProps } from '@/routes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const TaskItem = ({ task }: { task: TaskProps }) => {
    return (
        <Card className='w-[350px]'>
            <CardHeader className='text-center'>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                    <p>{task.text}</p>
                    <Button variant='default'>Done</Button>
                </div>
                <div className='space-x-4'>
                    <Button variant='secondary'>Edit</Button>
                    <Button variant='destructive'>Delete</Button>
                </div>
            </CardContent>
            <CardFooter className='text-xs text-center opacity-50 flex flex-col gap-1'>
                <p>
                    {' '}
                    Created:{' '}
                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
                <p>
                    {' '}
                    Updated:{' '}
                    {new Date(task.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
