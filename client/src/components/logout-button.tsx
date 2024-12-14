import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';
import { Button } from './ui/button';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const res = await axios.post('/api/auth/logout');
            return res.data;
        },
        onSuccess: (data) => {
            toast({ title: data.message, variant: 'positive' });
            navigate({ to: '/login' });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title:
                    error.response?.data?.message ||
                    error.message ||
                    'An unexpected error occurred',
                variant: 'destructive',
            });
        },
    });

    return <Button onClick={() => mutate()}>Logout</Button>;
};

export default LogoutButton;
