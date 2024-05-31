import { Router } from "express";
import {
  patientLoginRoute,
  patientLogoutRoute,
  patientSignupRoute,
} from "./auth/patientAuthRoute";
import { goodRoute } from "./good";

export const patientIndexRoute = Router();

patientIndexRoute.get("/", (req, res) => {
  res.send("Index Route");
});

patientIndexRoute.use("/login", patientLoginRoute);
patientIndexRoute.use("/logout", patientLogoutRoute);
patientIndexRoute.use("/signup", patientSignupRoute);
patientIndexRoute.use("/good", goodRoute);
