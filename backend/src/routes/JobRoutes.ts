import express from "express";
import { Protect } from "../middlewares/ProtectRoute";
import {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
} from "../controllers/JobController";

const router = express.Router();

router.post("/create", Protect, createJob);
router.get("/jobs", Protect, getAllJobs);
router.get("/:id", Protect, getJobById);
router.get("/myjobs", Protect, getMyJobs);

export default router;
