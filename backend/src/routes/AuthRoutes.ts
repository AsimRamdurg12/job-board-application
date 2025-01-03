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
router.post(
  "/update",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  Protect,
  updateProfile
);

export default router;
