import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
