import express from "express";
import { getCompany, registerCompany } from "../controllers/CompanyController";
import { Protect } from "../middlewares/ProtectRoute";

const router = express.Router();

router.post("/register", Protect, registerCompany);
router.post("/companies", Protect, getCompany);

export default router;
