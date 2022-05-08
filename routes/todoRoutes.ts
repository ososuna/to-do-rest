import { Router } from 'express';
import {
  getTodos,
  createTodo,
  completeTodo
} from '../controllers/todoController';

const router = Router();

router.get("/:userId", getTodos);
router.post("/:userId", createTodo);
router.put("/:id", completeTodo);

export default router;
