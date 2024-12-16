import axios from 'axios';

export const taskApi = async () => {
    try {
        const res = await axios.get('/api/tasks');
        return res.data;
    } catch (error) {
        throw new Error(`Failed while fetching tasks: ${error}`);
    }
};
