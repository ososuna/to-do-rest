import { Router } from "express";
import {
  createUser,
  loginUser,
  renewToken
} from '../controllers/authController';

const router = Router();

router.post("/", loginUser);
router.post("/create", createUser);
router.get("/renew", renewToken);

export default router;
