import express from "express";
import { Protect } from "../middlewares/ProtectRoute";
import {
  applyJobs,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/ApplicationController";

const router = express.Router();

router.post("/:id", Protect, applyJobs);
router.get("/get", Protect, getAppliedJobs);
router.get("/applicants/:id", Protect, getApplicants);
router.post("/status/:id", Protect, updateStatus);

export default router;
