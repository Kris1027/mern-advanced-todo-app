import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
        const mongoDB = await mongoose.connect(dbUri);
        console.info(`MongoDB connected successfully, ${mongoDB.connection.host}`);
    } catch (error) {
        throw new Error(`Failed to connect with MongoDB ${(error as Error).message}`);
    }
};

export default connectDB;
