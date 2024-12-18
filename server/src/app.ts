import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth-route';
import taskRouter from './routes/task-route';

import globalError from './middleware/global-error';
import notFound from './middleware/not-found';

import startServer from './server';

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

startServer(app);
