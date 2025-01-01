import express from "express";
import {
  getAllCompanies,
  getCompany,
  getCompanybyId,
  getCompanyJobs,
  registerCompany,
  updateCompany,
} from "../controllers/CompanyController";
import { Protect } from "../middlewares/ProtectRoute";

const router = express.Router();

router.post("/register", Protect, registerCompany);
router.get("/companies", Protect, getAllCompanies);
router.get("/mycompanies", Protect, getCompany);
router.get("/:id", Protect, getCompanybyId);
router.post("/update/:id", Protect, updateCompany);
router.get("/:id/jobs", Protect, getCompanyJobs);

export default router;
