import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/AuthController";
import { Protect } from "../middlewares/ProtectRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", Protect, logout);
router.post("/update", Protect, updateProfile);

export default router;
