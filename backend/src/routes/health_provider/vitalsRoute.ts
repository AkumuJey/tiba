import { Router, Request, Response } from "express";
import { prismaClient } from "../../server";
import { HospitalVitalsSchema } from "../../schema/HospitalVitalsSchema";

const vitalsRoute = Router();

vitalsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const data = HospitalVitalsSchema.parse(req.body);
    const newHospitalVitals = await prismaClient.hospitalVitals.create({
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
vitalsRoute.patch("/:id", async (req: Request, res: Response) => {
  try {
    const data = HospitalVitalsSchema.parse(req.body);
    const id = parseInt(req.params.id);
    const newHospitalVitals = await prismaClient.hospitalVitals.update({
      where: {
        id,
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
vitalsRoute.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const newHospitalVitals = await prismaClient.hospitalVitals.delete({
      where: {
        id,
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
