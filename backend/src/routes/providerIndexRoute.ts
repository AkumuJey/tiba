import { Router } from "express";
import {
  providerLoginRoute,
  providerLogoutRoute,
  providerSignupRoute,
} from "./auth/providerAuthRoute";
import appointmentRoute from "./health_provider/appointmentRoute";
import prescribeRoute from "./health_provider/prescribeRoute";
import { providerGood } from "./health_provider/providerGood";
import providerHistoryRecordRoute from "./health_provider/providerHistoryRecordRoute";

export const providerIndexRoute = Router();

providerIndexRoute.get("/", (req, res) => {
  res.send("Index Route");
});

providerIndexRoute.use("/login", providerLoginRoute);
providerIndexRoute.use("/logout", providerLogoutRoute);
providerIndexRoute.use("/signup", providerSignupRoute);
providerIndexRoute.use("/good", providerGood);
providerIndexRoute.use("/appointments", appointmentRoute);
providerIndexRoute.use("/medical-history", providerHistoryRecordRoute);
providerIndexRoute.use("/prescribe", prescribeRoute);
