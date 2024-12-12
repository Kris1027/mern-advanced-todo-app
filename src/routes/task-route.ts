import express from 'express';
import { createTask } from '../controllers/task-controller';
import { protectRoute } from '../utils/protect-route';
import { validateSchema } from '../utils/validate-schema';
import { validateTask } from '../validators/task-validator';

const router = express.Router();

router.post('/', protectRoute, validateSchema(validateTask), createTask);

export default router;
