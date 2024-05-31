import { Router } from "express";
import {
  deleteAllPrescriptionsController,
  deletePrescriptionController,
  getPatientSpecificPrescriptionController,
  getPrescriptionsController,
  getSinglePrescriptionController,
  postPrescriptionController,
  updatePrescriptionController,
} from "../../controllers/health_provider/prescribControllers";

const prescribeRoute = Router();

prescribeRoute.post("/", postPrescriptionController);
prescribeRoute.get("/", getPrescriptionsController);
prescribeRoute.delete("/", deleteAllPrescriptionsController);
prescribeRoute.get("/patient", getPatientSpecificPrescriptionController);
prescribeRoute.get("/:id", getSinglePrescriptionController);
prescribeRoute.delete("/:id", deletePrescriptionController);
prescribeRoute.patch("/:id", updatePrescriptionController);

export default prescribeRoute;
