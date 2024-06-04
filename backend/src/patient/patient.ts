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

const patient = Router();

patient.get("/", (req, res) => {
  res.json({
    message: "Hello Patient. Tiba is running.",
  });
});

patient.use("/login", patientLoginRoute);
patient.use("/logout", patientLogoutRoute);
patient.use("/signup", patientSignupRoute);
patient.use("/profile", patientProfile);
patient.use("/prescription", patientPrescription);
patient.use("/appointment", patientAppointment);
patient.use("/histories", patienthistory);
patient.use("/vitals", patientVitals);
patient.use("/labs", patientLabs);

export default patient;
