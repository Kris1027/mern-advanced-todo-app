import express from 'express';
import {
    createTask,
    deleteTask,
    getUserTasks,
    toggleTaskCompletion,
    updateTask,
} from '../controllers/task-controller.js';
import protectRoute from '../validators/protect-route.js';
import validateTask from '../validators/task-validator.js';
import validateSchema from '../validators/validate-schema.js';

const router = express.Router();

router.post('/', protectRoute, validateSchema(validateTask), createTask);
router.get('/', protectRoute, getUserTasks);
router.delete('/:id', protectRoute, deleteTask);
router.put('/:id', protectRoute, validateSchema(validateTask), updateTask);
router.put('/:id/complete', protectRoute, toggleTaskCompletion);

export default router;
