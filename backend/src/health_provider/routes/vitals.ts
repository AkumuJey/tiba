import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import { HospitalVitalsSchema } from "../schemas/HospitalVitalsSchema";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const vitals = Router({ mergeParams: true });

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

vitals.get("/", async (req: Request, res: Response) => {
  try {
    console.log("got here");
    const patientID = parseInt(req.params.patientID, 10);
    console.log("Patient: ", patientID);
    const hospitalVitalsList = await prismaClient.hospitalVitals.findMany({
      where: {
        patientID,
      },
    });
    if (!hospitalVitalsList) {
      return res.status(400).json({ message: "Failed to fetch vitals" });
    }
    res.status(201).json({ hospitalVitalsList });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch vitals", error });
  }
});
vitals.get("/:id", async (req: Request, res: Response) => {
  try {
    const patientID = parseInt(req.params.patientID, 10);
    const id = parseInt(req.params.id);
    const hospitalVitals = await prismaClient.hospitalVitals.findUniqueOrThrow({
      where: {
        id,
        patientID,
      },
    });
    res.status(201).json({ message: "Success", hospitalVitals });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch vitals", error });
  }
});

vitals.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const data = HospitalVitalsSchema.parse(req.body);
    const id = parseInt(customReq.params.id);
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
