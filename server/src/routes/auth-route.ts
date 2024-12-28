import express from 'express';
import { getUserData, loginUser, logoutUser, signupUser } from '../controllers/auth-controller';
import { protectRoute } from '../validators/protect-route';
import { validateSchema } from '../validators/validate-schema';
import { validateUser } from '../validators/auth-validator';

const router = express.Router();

router.post('/signup', validateSchema(validateUser), signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);
router.get('/user', protectRoute, getUserData);

export default router;
