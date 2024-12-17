export interface TaskProps {
    _id: string;
    user: string;
    title: string;
    text: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
}
