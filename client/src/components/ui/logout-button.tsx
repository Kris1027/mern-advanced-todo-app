import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const res = await axios.post('/api/auth/logout');
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            navigate({ to: '/login' });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <Button onClick={() => mutate()}>
            <LogOut />
        </Button>
    );
};

export default LogoutButton;
