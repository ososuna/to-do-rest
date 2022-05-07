import { Router } from "express";
import { validateJWT } from '../middlewares/validateJwt';
import {
  createUser,
  loginUser,
  renewToken
} from '../controllers/authController';

const router = Router();

router.post("/", loginUser);
router.post("/create", createUser);
router.get("/renew", validateJWT, renewToken);

export default router;
