import express from 'express';
import { signupUser } from '../controllers/auth-controller';
import { validateSchema } from '../utils/validate-schema';
import { validateUser } from '../validators/auth-validator';

const router = express.Router();

router.post('/signup', validateSchema(validateUser), signupUser);

export default router;
