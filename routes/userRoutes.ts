import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from '../middlewares/validateFields';
import { validateJwt } from '../middlewares/validateJwt';
import {
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get("/", getUsers);

router.put("/:id", [
  check('id', 'not a valid id').isMongoId(),
  check('username', 'username must be 3 characters min').isLength({ min: 3 }),
  check('password', 'password must be 6 characters min').isLength({ min: 6 }),
  validateFields
], updateUser);

router.delete("/:id", [
  validateJwt,
  check('id', 'not a valid id').isMongoId(),
  validateFields
],
 deleteUser);

export default router;
