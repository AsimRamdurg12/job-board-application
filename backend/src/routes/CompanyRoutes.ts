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
import { upload } from "../middlewares/Multer";

const router = express.Router();

router.post("/register", Protect, upload.single("logo"), registerCompany);
router.get("/companies", Protect, getAllCompanies);
router.get("/mycompanies", Protect, getCompany);
router.get("/:id", Protect, getCompanybyId);
router.post("/update/:id", Protect, upload.single("logo"), updateCompany);
router.get("/:id/jobs", Protect, getCompanyJobs);

export default router;
