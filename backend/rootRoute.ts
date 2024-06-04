import { Router } from "express";
import healthProvider from "./src/health_provider/healthProvider";
import patient from "./src/patient/patient";
import patientAuthMiddleware from "./src/middlewares/patientAuthMiddleWare";
import providerAuthMiddleWare from "./src/middlewares/providerAuthMiddleware";

const rootRoute = Router();

rootRoute.get("/", (req, res) => {
  console.log("/");
  res.json({
    message: "Hello world. Tiba is running.",
  });
});
rootRoute.use("/provider", providerAuthMiddleWare, healthProvider);
rootRoute.use("/patient", patientAuthMiddleware, patient);

export default rootRoute;
