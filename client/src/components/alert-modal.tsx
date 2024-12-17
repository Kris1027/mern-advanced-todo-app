import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import LoadingSpinner from './loading-spinner';
import { Trash2 } from 'lucide-react';

interface AlertModalProps {
    deleteTask: () => void;
    isDeleting: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({ deleteTask, isDeleting }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTask()}>
                        {isDeleting ? <LoadingSpinner size='xs' /> : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertModal;
