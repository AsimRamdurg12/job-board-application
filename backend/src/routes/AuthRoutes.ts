import express from "express";
import { login, signup } from "../controllers/AuthController";
import { SignUpValidate } from "../middlewares/Validation/signup/SignUpValidate";
import { signupSchema } from "../middlewares/Validation/signup/SignupSchema";

const router = express.Router();
//@ts-ignore
router.post("/signup", SignUpValidate(signupSchema), signup);
router.post("/login", login);

export default router;
