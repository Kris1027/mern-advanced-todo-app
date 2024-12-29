import express from 'express';
import { getUserData, loginUser, logoutUser, signupUser } from '../controllers/auth-controller.js';
import validateUser from '../validators/auth-validator.js';
import protectRoute from '../validators/protect-route.js';
import validateSchema from '../validators/validate-schema.js';

const router = express.Router();

router.post('/signup', validateSchema(validateUser), signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);
router.get('/user', protectRoute, getUserData);

export default router;
