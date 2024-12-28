import connectDB from './config/db.js';
import type { Application } from 'express';

const startServer = async (app: Application) => {
    const PORT = process.env.PORT || 3000;

    try {
        await connectDB();

        app.on('error', (error) => {
            console.error(`Express app error: ${error}`);
            process.exit(1);
        });

        const server = app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

        server.on('error', (error) => {
            console.error(`Server start error: ${error}`);
            process.exit(1);
        });
    } catch (error) {
        console.error(`Failed to start server ${(error as Error).message}`);
        process.exit(1);
    }
};

export default startServer;
