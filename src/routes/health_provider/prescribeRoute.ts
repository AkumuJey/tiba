import { Router } from "express";
import {
  deleteAllPrescriptionsController,
  deletePrescriptionController,
  getPatientSpecificPrescriptionController,
  getPrescriptionsController,
  getSinglePrescriptionController,
  postPrescriptionController,
  updatePrescriptionController,
} from "../../controllers/health_provider/prescribeControllers";
import {
  deleteAllPrescriptionDetailsController,
  deletePrescriptionDetailController,
  updatePrescriptionDetailController,
} from "../../controllers/health_provider/prescriptionDetailControllers";

const prescribeRoute = Router();

prescribeRoute.post("/", postPrescriptionController);
prescribeRoute.get("/", getPrescriptionsController);
prescribeRoute.delete("/", deleteAllPrescriptionsController);
prescribeRoute.get("/patient", getPatientSpecificPrescriptionController);
prescribeRoute.get("/:id", getSinglePrescriptionController);
prescribeRoute.delete("/:id", deletePrescriptionController);
prescribeRoute.patch("/:id", updatePrescriptionController);

// Details route
prescribeRoute.patch("/details", updatePrescriptionDetailController);
prescribeRoute.delete("/details", deleteAllPrescriptionDetailsController);
prescribeRoute.delete("/details/:id", deletePrescriptionDetailController);

export default prescribeRoute;
