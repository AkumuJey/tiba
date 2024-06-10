import { Router } from "express";
import healthProvider from "./src/health_provider/healthProvider";
import patient from "./src/patient/patient";
import providerAuthMiddleWare from "./src/middlewares/providerAuthMiddleware";
import selectedPatients from "./src/health_provider/schemas/selectedPatients";

const rootRoute = Router();

rootRoute.get("/", (req, res) => {
  console.log("/");
  res.json({
    message: "Hello world. Tiba is running.",
  });
});

rootRoute.use("/provider", healthProvider);
rootRoute.use(
  "/provider/:patientID",
  [providerAuthMiddleWare],
  selectedPatients
);
rootRoute.use("/patient", patient);

export default rootRoute;
