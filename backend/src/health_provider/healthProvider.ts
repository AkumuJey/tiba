import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../server";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}
const healthProvider = Router();

healthProvider.use("/profile");
healthProvider.use("/:patientID");
healthProvider.get("/appointment", async (req: Request, res: Response) => {
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
      return res.status(400).json({ message: "Failed to fetch appointments" });
    }
    res.status(200).json({ message: "Success", appointments });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to fetch appointments", error });
  }
});
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
