import { Router } from "express";
import {
  patientLoginRoute,
  patientLogoutRoute,
  patientSignupRoute,
} from "./auth/patientAuthRoute";
import { patientGood } from "./patient/patientGood";

export const patientIndexRoute = Router();

patientIndexRoute.get("/", (req, res) => {
  res.json({
    message: "Hello world. Tiba is running.",
  });
});

patientIndexRoute.use("/login", patientLoginRoute);
patientIndexRoute.use("/logout", patientLogoutRoute);
patientIndexRoute.use("/signup", patientSignupRoute);
patientIndexRoute.use("/good", patientGood);
