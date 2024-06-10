import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../server";
import {
  providerLoginRoute,
  providerLogoutRoute,
  providerSignupRoute,
} from "../routes/auth/providerAuthRoute";
import selectedPatients from "./schemas/selectedPatients";
import providerProfile from "./routes/providerProfile";
import providerAuthMiddleWare from "../middlewares/providerAuthMiddleware";
import getPatients from "./routes/getPatients";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}
const healthProvider = Router();
healthProvider.use("/patients", [providerAuthMiddleWare], getPatients);

healthProvider.use("/login", providerLoginRoute);
healthProvider.use("/logout", providerLogoutRoute);
healthProvider.use("/signup", providerSignupRoute);
healthProvider.use("/profile", [providerAuthMiddleWare], providerProfile);
healthProvider.use("/:patientID", [providerAuthMiddleWare], selectedPatients);
healthProvider.get(
  "/appointments",
  [providerAuthMiddleWare],
  async (req: Request, res: Response) => {
    try {
      const customReq = req as CustomRequest;
      const appointments = prismaClient.appointments.findMany({
        where: {
          healthProviderID: customReq.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!appointments) {
        return res
          .status(400)
          .json({ message: "Failed to fetch appointments" });
      }
      res.status(200).json({ message: "Success", appointments });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to fetch appointments", error });
    }
  }
);
healthProvider.get("/prescription", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const prescriptions = prismaClient.prescription.findMany({
      where: {
        healthcareProviderID: customReq.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!prescriptions) {
      return res.status(400).json({ message: "Failed to fetch prescriptions" });
    }
    res.status(200).json({ message: "Success", prescriptions });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to fetch prescriptions", error });
  }
});

export default healthProvider;
