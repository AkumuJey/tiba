import { Router } from "express";
import { patientController } from "../../controllers/patient/patientController";

export const patientRoute = Router();

patientRoute.get("/", patientController);
