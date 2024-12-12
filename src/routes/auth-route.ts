import express from 'express';
import { loginUser, logoutUser, signupUser } from '../controllers/auth-controller';
import { validateSchema } from '../utils/validate-schema';
import { validateUser } from '../validators/auth-validator';

const router = express.Router();

router.post('/signup', validateSchema(validateUser), signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;