import express from 'express';
import { loginUser, signupUser } from '../controllers/auth-controller';
import { validateSchema } from '../utils/validate-schema';
import { validateUser } from '../validators/auth-validator';

const router = express.Router();

router.post('/signup', validateSchema(validateUser), signupUser);
router.post('/login', loginUser);

export default router;
