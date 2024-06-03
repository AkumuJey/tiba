import { Request, Response } from "express";
import { PatientHistorySchema } from "../../schema/PatientDetails";
import { prismaClient } from "../../server";
import {
  MedicalHistorySchema,
  UpdateMedicalHistorySchema,
} from "../../schema/MedicalHistorySchema";
import { HealthcareProvider } from "@prisma/client";

interface CustomRequest extends Request {
  user: HealthcareProvider; // Changed to non-optional
}

export const postHistoriesController = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const newData = MedicalHistorySchema.parse(customReq.body);
    const newMedicalHistory = await prismaClient.medicalHistory.create({
      data: {
        ...newData,
        healthProviderID: customReq.user.id,
      },
    });

    if (!newMedicalHistory) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ newMedicalHistory });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
};

export const getHistoriesController = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const histories = await prismaClient.medicalHistory.findMany({
      where: {
        healthProviderID: customReq.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!histories || histories.length === 0) {
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getSingleHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const medicalHistory = await prismaClient.medicalHistory.findUnique({
      where: { id, healthProviderID: customReq.user.id },
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
};

export const updateHistoryController = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const data = UpdateMedicalHistorySchema.parse(customReq.body);
    const updatedHistory = await prismaClient.medicalHistory.update({
      where: { id },
      data,
    });

    if (!updatedHistory) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ updatedHistory });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
};

export const deleteHistoryController = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const deletedMedicalHistory = await prismaClient.medicalHistory.delete({
      where: { id, healthProviderID: customReq.user.id },
    });
    res
      .status(204)
      .json({ message: "History deleted successfully", deletedMedicalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Failed to delete history" });
  }
};

export const getSinglePatientHistories = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const { patientID } = customReq.body;
    const medicalHistories = await prismaClient.medicalHistory.findMany({
      where: { patientID, healthProviderID: customReq.user.id },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(medicalHistories);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Failed to retrieve medical histories" });
  }
};
