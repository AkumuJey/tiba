import { Router, Request, Response } from "express";
import { HomeVitalsSchema } from "../../schema/HomeVitalsSchema";
import { prismaClient } from "../../server";

const homeVitalsRoute = Router();

homeVitalsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const data = HomeVitalsSchema.parse(req.body);
    const newHospitalVitals = await prismaClient.homeVitals.create({
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
homeVitalsRoute.patch("/:id", async (req: Request, res: Response) => {
  try {
    const data = HomeVitalsSchema.parse(req.body);
    const id = parseInt(req.params.id);
    const newHospitalVitals = await prismaClient.homeVitals.update({
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
homeVitalsRoute.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const newHospitalVitals = await prismaClient.homeVitals.delete({
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
