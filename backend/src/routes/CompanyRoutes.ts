import express from "express";
import {
  getAllCompanies,
  getCompany,
  getCompanybyId,
  registerCompany,
  updateCompany,
} from "../controllers/CompanyController";
import { Protect } from "../middlewares/ProtectRoute";

const router = express.Router();

router.post("/register", Protect, registerCompany);
router.get("/companies", Protect, getAllCompanies);
router.get("/mycompanies", Protect, getCompany);
router.get("/:id", Protect, getCompanybyId);
router.put("/update/:id", Protect, updateCompany);

export default router;
