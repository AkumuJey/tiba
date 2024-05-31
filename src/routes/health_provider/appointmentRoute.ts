import { Router } from "express";
import {
  bookAppointmentController,
  deleteAllAppointmentsController,
  deleteAppointmentController,
  getAppointmentsController,
  getSingleAppointmentController,
  updateAppointmentController,
} from "../../controllers/health_provider/appointmentControllers";

const appointmentRoute = Router();

appointmentRoute.post("/", bookAppointmentController);

appointmentRoute.get("/", getAppointmentsController);
appointmentRoute.get("/:id", getSingleAppointmentController);

appointmentRoute.patch("/:id", updateAppointmentController);
appointmentRoute.delete("/:id", deleteAppointmentController);
appointmentRoute.delete("/", deleteAllAppointmentsController);

export default appointmentRoute;
