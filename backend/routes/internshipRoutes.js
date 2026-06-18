import express from "express";

const router = express.Router();

import { createInternshipApplication } from "../controllers/internshipController.js";
import { validateInternshipApplication } from "../middleware/validateInternship.js";

router.post("/apply", validateInternshipApplication, createInternshipApplication);

export default router;
