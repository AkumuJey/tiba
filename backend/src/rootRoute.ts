import { Router } from "express";
import healthProvider from "./health_provider/healthProvider";
import providerAuthMiddleWare from "./middlewares/providerAuthMiddleware";
import selectedPatients from "./health_provider/routes/selectedPatients";
import patient from "./patient/patient";

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
