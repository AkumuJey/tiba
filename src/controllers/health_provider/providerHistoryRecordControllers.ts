import { Router, Request, Response } from "express";
import { PatientHistorySchema } from "../../schema/PatientDetails";
import { prismaClient } from "../../server";

const patientDetailsRoute = Router();

export const postHistoriesController = async (req: Request, res: Response) => {
  try {
    PatientHistorySchema.parse(req.body);
    const {
      patientID,
      presentation,
      medicalHistory,
      healthProviderID,
      physicalExamination,
      Summary,
    } = req.body;
    const history = await prismaClient.medicalHistory.create({
      data: {
        presentation,
        medicalHistory,
        patientID: parseInt(patientID),
        healthProviderID,
        physicalExamination,
        Summary,
      },
    });

    if (!history) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ history });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
};

export const getHistoriesController = async (req: Request, res: Response) => {
  try {
    const { patientID } = req.body;
    const histories = await prismaClient.medicalHistory.findMany({
      where: { patientID },
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
    const id = parseInt(req.params.id, 10);
    const medicalHistory = await prismaClient.medicalHistory.findUnique({
      where: { id },
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
    const id = parseInt(req.params.id, 10);
    PatientHistorySchema.parse(req.body);
    const { patientID, presentation, medicalHistory } = req.body;
    const updatedHistory = await prismaClient.medicalHistory.update({
      where: { id },
      data: { presentation, medicalHistory, patientID },
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
    const id = parseInt(req.params.id, 10);
    await prismaClient.medicalHistory.delete({ where: { id } });
    res.status(204).json({ message: "History deleted successfully" });
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
    const { patientID } = req.body;
    const medicalHistories = await prismaClient.medicalHistory.findMany({
      where: { patientID },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(medicalHistories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "Failed to retrieve medical histories" });
  }
};
