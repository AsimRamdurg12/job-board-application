import express from "express";
import {
  getProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/AuthController";
import { Protect } from "../middlewares/ProtectRoute";
import { upload } from "../middlewares/Multer";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", Protect, logout);
router.get("/get", Protect, getProfile);
router.post("/update", Protect, upload.single("file"), updateProfile);

export default router;
