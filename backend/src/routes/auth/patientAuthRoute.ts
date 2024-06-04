import { Router } from "express";
import {
  patientLoginController,
  patientSignupController,
} from "../../controllers/patientAuthController";

export const patientLoginRoute = Router();

patientLoginRoute.post("/", patientLoginController);

export const patientSignupRoute = Router();

patientSignupRoute.post("/", patientSignupController);

export const patientLogoutRoute = Router();

patientLogoutRoute.post("/", (req, res) => {
  res.send("logout");
});
