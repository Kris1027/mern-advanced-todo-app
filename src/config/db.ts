import mongoose from 'mongoose';

const connectDB = async () => {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
        console.error('MONGO_URI is not defined in environment variables');
        process.exit(1);
    }

    try {
        const mongoDB = await mongoose.connect(dbUri);
        console.log(`MongoDB connected successfully, ${mongoDB.connection.host}`);
    } catch (error) {
        console.error(`Failed to connect with MongoDB ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
