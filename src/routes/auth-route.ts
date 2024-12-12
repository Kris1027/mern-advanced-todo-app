import express from 'express';
import { signupUser } from '../controllers/auth-controller';

const router = express.Router();

router.post('/signup', signupUser);

export default router;
