import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import startServer from './server';
import globalError from './middleware/global-error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(globalError);

startServer(app);
