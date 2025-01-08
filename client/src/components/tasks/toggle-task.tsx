import { CheckCircle, Loader } from 'lucide-react';
import type { TaskProps } from '@/types/task-type';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ToggleTaskProps {
    task: TaskProps;
    toggleTaskCompletion: () => void;
    isCompleting: boolean;
}

const ToggleTask: React.FC<ToggleTaskProps> = ({ task, toggleTaskCompletion, isCompleting }) => {
    return (
        <Button onClick={() => toggleTaskCompletion()} variant='default'>
            {isCompleting ? (
                <LoadingSpinner size='xs' />
            ) : task.isComplete ? (
                <CheckCircle />
            ) : (
                <Loader className='animate-slower-spin' />
            )}
        </Button>
    );
};

export default ToggleTask;
