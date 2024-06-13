import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import {
  MedicalHistorySchema,
  UpdateMedicalHistorySchema,
} from "../schemas/MedicalHistorySchema";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const history = Router({ mergeParams: true });

history.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(req.params.patientID, 10);
    const newData = MedicalHistorySchema.parse(customReq.body);
    console.log(customReq.user);
    console.log("New Dat: ", newData);
    const newMedicalHistory = await prismaClient.medicalHistory.create({
      data: {
        ...newData,
        patientID,
        healthProviderID: customReq.user.id,
      },
    });

    if (!newMedicalHistory) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ newMedicalHistory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Failed to add details" });
  }
});

history.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(req.params.patientID, 10);
    const histories = await prismaClient.medicalHistory.findMany({
      where: {
        healthProviderID: customReq.user.id,
        patientID,
      },
      include: {
        HospitalLabs: true,
        HospitalVitals: true,
        Prescription: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!histories) {
      return res.status(400).json({ message: "Failed to fetch histories" });
    }
    res.status(200).json({ message: "Success", histories });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch histories" });
  }
});
history.get("/all", async (req: Request, res: Response) => {
  try {
    const patientID = parseInt(req.params.patientID, 10);
    const histories = await prismaClient.medicalHistory.findMany({
      where: {
        patientID,
      },
      include: {
        HospitalLabs: true,
        HospitalVitals: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!histories) {
      return res.status(400).json({ message: "Failed to fetch histories" });
    }
    res.status(200).json({ message: "Success", histories });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch histories" });
  }
});

history.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(req.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const medicalHistory = await prismaClient.medicalHistory.findUnique({
      where: { id, healthProviderID: customReq.user.id, patientID },
    });
    if (!medicalHistory) {
      res.status(404).json({ message: "Medical history not found" });
    } else {
      res.status(200).json(medicalHistory);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "Failed to retrieve medical history" });
  }
});

history.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(req.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const data = UpdateMedicalHistorySchema.parse(customReq.body);
    const updatedHistory = await prismaClient.medicalHistory.update({
      where: { id, patientID },
      data,
    });

    if (!updatedHistory) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ updatedHistory });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
});

export const deleteHistoryController = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(req.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const deletedMedicalHistory = await prismaClient.medicalHistory.delete({
      where: { id, healthProviderID: customReq.user.id, patientID },
    });
    res
      .status(204)
      .json({ message: "History deleted successfully", deletedMedicalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Failed to delete history" });
  }
};

export default history;
