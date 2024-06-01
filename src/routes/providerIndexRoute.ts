import { Router } from "express";
import { providerGood } from "../controllers/health_provider/providerGood";
import {
  providerLoginRoute,
  providerLogoutRoute,
  providerSignupRoute,
} from "./auth/providerAuthRoute";
import appointmentRoute from "./health_provider/appointmentRoute";
import prescribeRoute from "./health_provider/prescribeRoute";
import providerHistoryRecordRoute from "./health_provider/providerHistoryRecordRoute";
import { patientRoute } from "./patient";

export const providerIndexRoute = Router();

providerIndexRoute.get("/", (req, res) => {
  res.send("Index Route");
});

providerIndexRoute.use("/login", providerLoginRoute);
providerIndexRoute.use("/logout", providerLogoutRoute);
providerIndexRoute.use("/signup", providerSignupRoute);
providerIndexRoute.use("/patient", patientRoute);
providerIndexRoute.use("/patient/good", providerGood);
providerIndexRoute.use("/appointments", appointmentRoute);
providerIndexRoute.use("/medical-history", providerHistoryRecordRoute);
providerIndexRoute.use("/prescribe", prescribeRoute);
