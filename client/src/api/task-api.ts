import axios, { AxiosResponse } from 'axios';
import { TaskProps } from '@/types/task-type';

interface TaskResponse {
    tasks: TaskProps[];
}

export const taskApi = async (): Promise<TaskResponse> => {
    try {
        const res: AxiosResponse<TaskResponse> = await axios.get('/api/tasks');
        return res.data;
    } catch (error) {
        throw new Error(`Failed while fetching tasks: ${error}`);
    }
};
