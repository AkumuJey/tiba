import { Router } from "express";
import healthProvider from "./src/health_provider/healthProvider";
import patient from "./src/patient/patient";

const rootRoute = Router();

rootRoute.get("/", (req, res) => {
  console.log("/");
  res.json({
    message: "Hello world. Tiba is running.",
  });
});
rootRoute.use("/provider", healthProvider);
rootRoute.use("/patient", patient);

export default rootRoute;
