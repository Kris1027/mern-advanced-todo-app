import axios, { type AxiosResponse } from 'axios';
import type { TaskProps } from '@/types/task-type';

interface TaskResponse {
    tasks: TaskProps[];
}

export const taskApi = async (): Promise<TaskResponse> => {
    try {
        const res: AxiosResponse<TaskResponse> = await axios.get('/api/tasks');
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}`);
        } else {
            throw new Error(`Failed while fetching tasks: ${error}`);
        }
    }
};
