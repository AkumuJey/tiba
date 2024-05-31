import { Router } from "express";
import {
  providerLoginRoute,
  providerLogoutRoute,
  providerSignupRoute,
} from "./auth/providerAuthRoute";
import { goodRoute } from "./good";
import { healthProviderRoute } from "./health_provider";
import { patientRoute } from "./patient";
import appointmentRoute from "./health_provider/appointmentRoute";
import providerHistoryRecordRoute from "./health_provider/providerHistoryRecordRoute";
import prescribeRoute from "./health_provider/prescribeRoute";

export const providerIndexRoute = Router();

providerIndexRoute.get("/", (req, res) => {
  res.send("Index Route");
});

providerIndexRoute.use("/login", providerLoginRoute);
providerIndexRoute.use("/logout", providerLogoutRoute);
providerIndexRoute.use("/signup", providerSignupRoute);
providerIndexRoute.use("/good", goodRoute);
providerIndexRoute.use("/patient", patientRoute);
providerIndexRoute.use("/health-provider", healthProviderRoute);
providerIndexRoute.use("/appointments", appointmentRoute);
providerIndexRoute.use("/medical-history", providerHistoryRecordRoute);
providerIndexRoute.use("/prescribe", prescribeRoute);
