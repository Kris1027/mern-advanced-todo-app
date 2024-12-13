import express from 'express';
import { createTask, deleteTask, getUserTasks, updateTask } from '../controllers/task-controller';
import { protectRoute } from '../utils/protect-route';
import { validateSchema } from '../utils/validate-schema';
import { validateTask } from '../validators/task-validator';

const router = express.Router();

router.post('/', protectRoute, validateSchema(validateTask), createTask);
router.get('/', protectRoute, getUserTasks);
router.delete('/:id', protectRoute, deleteTask);
router.put('/:id', protectRoute, validateSchema(validateTask), updateTask);

export default router;