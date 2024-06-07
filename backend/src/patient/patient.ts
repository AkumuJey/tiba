import { Router } from "express";
import patientProfile from "./routes/patientProfile";
import patientPrescription from "./routes/patientPrescription";
import patientVitals from "./routes/patientVitals";
import patientAppointment from "./routes/patientAppointment";
import patientLabs from "./routes/patientLabs";
import patienthistory from "./routes/patientHistory";
import {
  patientLoginRoute,
  patientLogoutRoute,
  patientSignupRoute,
} from "../routes/auth/patientAuthRoute";
import patientAuthMiddleware from "../middlewares/patientAuthMiddleWare";

const patient = Router();

patient.get("/", (req, res) => {
  res.json({
    message: "Hello Patient. Tiba is running.",
  });
});

patient.use("/login", patientLoginRoute);
patient.use("/logout", patientLogoutRoute);
patient.use("/signup", patientSignupRoute);
patient.use("/profile", [patientAuthMiddleware], patientProfile);
patient.use("/prescription", [patientAuthMiddleware], patientPrescription);
patient.use("/appointment", [patientAuthMiddleware], patientAppointment);
patient.use("/histories", [patientAuthMiddleware], patienthistory);
patient.use("/vitals", [patientAuthMiddleware], patientVitals);
patient.use("/labs", [patientAuthMiddleware], patientLabs);

export default patient;
