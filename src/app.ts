import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth-route';

import globalError from './middleware/global-error';
import notFound from './middleware/not-found';

import startServer from './server';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use(notFound);
app.use(globalError);

startServer(app);
