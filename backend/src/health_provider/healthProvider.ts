import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import providerAuthMiddleWare from "../middlewares/providerAuthMiddleware";
import {
  providerLoginRoute,
  providerLogoutRoute,
  providerSignupRoute,
} from "../routes/auth/providerAuthRoute";
import { prismaClient } from "../server";
import getPatients from "./routes/getPatients";
import providerProfile from "./routes/providerProfile";
import selectedPatients from "./schemas/selectedPatients";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}
const healthProvider = Router();
healthProvider.use("/patients", [providerAuthMiddleWare], getPatients);
healthProvider.use("/login", providerLoginRoute);
healthProvider.use("/logout", providerLogoutRoute);
healthProvider.use("/signup", providerSignupRoute);
healthProvider.use("/profile", [providerAuthMiddleWare], providerProfile);

healthProvider.get(
  "/appointments",
  [providerAuthMiddleWare],
  async (req: Request, res: Response) => {
    try {
      console.log("I was hit");
      const customReq = req as CustomRequest;
      const appointments = await prismaClient.appointments.findMany({
        where: {
          healthProviderID: customReq.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          patient: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      if (!appointments) {
        return res
          .status(400)
          .json({ message: "Failed to fetch appointments" });
      }
      console.log(appointments);
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
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
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
