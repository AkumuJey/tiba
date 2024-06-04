import { Request, Response, Router } from "express";
import { HomeLabsSchema } from "../schemas/HomeLabsSchema";
import { prismaClient } from "../../server";
import { Patient } from "@prisma/client";

interface CustomRequest extends Request {
  user: Patient;
}

const patientPrescription = Router();

patientPrescription.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const prescriptions = await prismaClient.prescription.findMany({
      where: {
        patientID: customReq.user.id,
      },
      include: {
        prescriptionDetails: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!prescriptions) {
      return res
        .status(400)
        .json({ message: "Failed to fetch prescriptions." });
    }
    res.status(200).json({ message: "success", prescriptions });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch prescriptions", error });
  }
});
patientPrescription.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const prescriptions = await prismaClient.prescription.findFirst({
      where: {
        patientID: customReq.user.id,
      },
      include: {
        prescriptionDetails: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!prescriptions) {
      return res
        .status(400)
        .json({ message: "Failed to fetch prescriptions." });
    }
    res.status(200).json({ message: "success", prescriptions });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch prescriptions", error });
  }
});

export default patientPrescription;
