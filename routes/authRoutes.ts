import { Router } from "express";
import {
  createUser,
  loginUser
} from '../controllers/authController';

const router = Router();

router.post("/", loginUser);
router.post("/create", createUser);

export default router;
