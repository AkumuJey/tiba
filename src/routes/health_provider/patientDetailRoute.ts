import { Router, Request, Response } from "express";
import { PatientHistorySchema } from "../../schema/PatientDetails";
import { prismaClient } from "../../server";

const patientDetailsRoute = Router();

patientDetailsRoute.post("/", async (req: Request, res: Response) => {
  try {
    PatientHistorySchema.parse(req.body);
    const { patientID, presentation, medicalHistory } = req.body;
    const history = await prismaClient.medicalHistory.create({
      data: { presentation, medicalHistory, patientID },
    });

    if (!history) {
      return res.status(400).json({ message: "Failed to add details" });
    }
    return res.status(201).json({ history });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to add details" });
  }
});
patientDetailsRoute.get("/", async (req: Request, res: Response) => {
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
});
patientDetailsRoute.patch("/", async (req: Request, res: Response) => {});
patientDetailsRoute.delete("/:id", (req: Request, res: Response) => {});
