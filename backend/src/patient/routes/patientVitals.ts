import { Router, Request, Response } from "express";
import { HomeVitalsSchema } from "../schemas/HomeVitalsSchema";
import { prismaClient } from "../../server";
import { Patient } from "@prisma/client";

interface CustomRequest extends Request {
  user: Patient;
}

const patientVitals = Router();

patientVitals.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const homeVitals = await prismaClient.homeVitals.findMany({
      where: {
        patientID: customReq.user.id,
      },
    });
    const hospitalVitals = await prismaClient.hospitalVitals.findMany({
      where: {
        patientID: customReq.user.id,
      },
    });
    if (!homeVitals || hospitalVitals) {
      return res.status(400).json({ message: "Failed to get vitals" });
    }
    const initalList = [...homeVitals, hospitalVitals];
    const vitalsList = initalList.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    res.status(201).json({ vitalsList });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
patientVitals.post("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id);
    const vitals = await prismaClient.homeVitals.findFirst({
      where: {
        id,
        patientID: customReq.user.id,
      },
    });
    if (!vitals) {
      return res.status(400).json({ message: "Failed to get vitals" });
    }
    res.status(201).json({ vitals });
  } catch (error) {
    return res.status(400).json({ error, message: "Failed to get vitals" });
  }
});
patientVitals.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const data = HomeVitalsSchema.parse(customReq.body);
    const newHomeVitals = await prismaClient.homeVitals.create({
      data: { ...data, patientID: customReq.user.id },
    });
    if (!newHomeVitals) {
      return res.status(400).json({ message: "Failed to store new vitals" });
    }
    res.status(201).json({ newHomeVitals });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to store new vitals" });
  }
});
patientVitals.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const data = HomeVitalsSchema.parse(customReq.body);
    const id = parseInt(customReq.params.id);
    const vitals = await prismaClient.homeVitals.update({
      where: {
        id,
        patientID: customReq.user.id,
      },
      data,
    });
    if (!vitals) {
      return res.status(400).json({ message: "Failed to store new vitals" });
    }
    res.status(201).json({ vitals });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
patientVitals.delete("/:id", async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const id = parseInt(customReq.params.id);
  try {
    const deletedVitals = await prismaClient.homeVitals.delete({
      where: {
        id,
        patientID: customReq.user.id,
      },
    });
    if (!deletedVitals) {
      return res.status(400).json({ message: "Failed to delete vitals" });
    }
    res.status(201).json({ deletedVitals });
  } catch (error) {
    return res.status(400).json({ error, message: "Failed to delete vitals" });
  }
});

export default patientVitals;
