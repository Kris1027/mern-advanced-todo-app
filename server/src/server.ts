import connectDB from 'connections/db.js';
import type { Application } from 'express';

const startServer = async (app: Application): Promise<void> => {
    const PORT = process.env.PORT ?? 3000;

    try {
        await connectDB();

        app.on('error', (error) => {
            throw new Error(`Express app error: ${String(error)}`);
        });

        const server = app.listen(PORT, () => {
            console.info(`Server is running at http://localhost:${PORT}`);
        });

        server.on('error', (error) => {
            throw new Error(`Server start error: ${error}`);
        });
    } catch (error) {
        throw new Error(`Failed to start server ${(error as Error).message}`);
    }
};

export default startServer;
