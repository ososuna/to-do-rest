import { Router } from "express";
import { check }  from "express-validator";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createUser,
  loginUser,
  renewToken
} from '../controllers/authController';
import { validateFields } from "../middlewares/validateFields";

const router = Router();

router.post("/", [
  check('username', 'username is required').not().isEmpty(),
  validateFields
], loginUser);

router.post("/create", [
  check('username', 'username is required').not().isEmpty(),
  check('password', 'password must be 6 characters min').isLength({ min: 6 }),
  validateFields
], createUser);

router.get("/renew", validateJwt, renewToken);

export default router;
