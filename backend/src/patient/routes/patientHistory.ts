import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import { Patient } from "@prisma/client";

interface CustomRequest extends Request {
  user: Patient;
}

const patienthistory = Router();

patienthistory.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const medicalHistories = await prismaClient.medicalHistory.findMany({
      where: {
        patientID: customReq.user.id,
      },
      include: {
        HospitalVitals: true,
        HospitalLabs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!medicalHistories) {
      return res
        .status(400)
        .json({ message: "Failed to fetch medical histories" });
    }
    res.status(200).json({ message: "success", medicalHistories });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Failed to fetch medical histories" });
  }
});
patienthistory.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id);
    const medicalHistory = await prismaClient.medicalHistory.findFirst({
      where: {
        patientID: customReq.user.id,
        id,
      },
      include: {
        HospitalVitals: true,
        HospitalLabs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!medicalHistory) {
      return res
        .status(400)
        .json({ message: "Failed to fetch medical histories" });
    }
    res.status(200).json({ message: "success", medicalHistory });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Failed to fetch medical histories" });
  }
});

export default patienthistory;
