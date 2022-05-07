import { Router } from "express";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createUser,
  loginUser,
  renewToken
} from '../controllers/authController';

const router = Router();

router.post("/", loginUser);
router.post("/create", createUser);
router.get("/renew", validateJwt, renewToken);

export default router;
