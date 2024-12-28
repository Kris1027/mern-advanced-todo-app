import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import globalError from './middleware/global-error.js';
import notFound from './middleware/not-found.js';
import authRouter from './routes/auth-route.js';
import taskRouter from './routes/task-route.js';

import startServer from './server.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const corsOptions = {
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use(notFound);
app.use(globalError);

startServer(app).catch(() => {
    /* Error handling is already implemented in startServer function */
});
