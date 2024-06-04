import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import { HospitalVitalsSchema } from "../schemas/HospitalVitalsSchema";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const vitals = Router();

vitals.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const data = HospitalVitalsSchema.parse(req.body);
    const newHospitalVitals = await prismaClient.hospitalVitals.create({
      data: {
        ...data,
        patientID,
        healthProviderID: customReq.user.id,
      },
    });
    if (!newHospitalVitals) {
      return res.status(400).json({ message: "Failed to store new vitals" });
    }
    res.status(201).json({ newHospitalVitals });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

vitals.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const data = HospitalVitalsSchema.parse(req.body);
    const id = parseInt(req.params.id);
    const newHospitalVitals = await prismaClient.hospitalVitals.update({
      where: {
        id,
        patientID,
        healthProviderID: customReq.user.id,
      },
      data,
    });
    if (!newHospitalVitals) {
      return res.status(400).json({ message: "Failed to store new vitals" });
    }
    res.status(201).json({ newHospitalVitals });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

vitals.delete("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const newHospitalVitals = await prismaClient.hospitalVitals.delete({
      where: {
        id,
        healthProviderID: customReq.user.id,
        patientID,
      },
    });
    if (!newHospitalVitals) {
      return res.status(400).json({ message: "Failed to store new vitals" });
    }
    res.status(201).json({ newHospitalVitals });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default vitals;
