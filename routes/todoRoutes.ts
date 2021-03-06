import { Router } from 'express';
import { check }  from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import {
  getTodos,
  createTodo,
  completeTodo,
  updateToDo
} from '../controllers/todoController';

const router = Router();

router.get("/:userId", [
  check('userId', 'not a valid id').isMongoId(),
  validateFields
], getTodos);

router.post("/:userId", [
  check('userId', 'not a valid id').isMongoId(),
  check('title', 'title is required').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  validateFields
], createTodo);

router.put("/:id", [
  check('id', 'not a valid id').isMongoId(),
  validateFields
], completeTodo);

router.put("/update/:id", [
  check('id', 'not a valid id').isMongoId(),
  validateFields
], updateToDo);

export default router;
