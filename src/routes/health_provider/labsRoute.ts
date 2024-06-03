import { Router, Request, Response } from "express";
import { HospitalLabsSchema } from "../../schema/HospitalLabsSchema";
import { prismaClient } from "../../server";

const labRoutes = Router();

labRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const data = HospitalLabsSchema.parse(req.body);
    const newHospitalLabs = await prismaClient.hospitalLabs.create({
      data,
    });
    if (!newHospitalLabs) {
      return res.status(400).json({ message: "Failed to add lab results" });
    }
    return res.status(201).json({ message: "Success", newHospitalLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to add lab results" });
  }
});
labRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const hospitalLabsResultsList = await prismaClient.hospitalLabs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!hospitalLabsResultsList) {
      return res
        .status(400)
        .json({ message: "Failed to fetch lab results list." });
    }
    return res
      .status(200)
      .json({ message: "Success", hospitalLabsResultsList });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results list" });
  }
});
labRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const hospitalLabsResults = await prismaClient.hospitalLabs.findFirst({
      where: {
        id,
      },
    });
    if (!hospitalLabsResults) {
      return res.status(400).json({ message: "Failed to fetch lab results" });
    }
    return res.status(200).json({ message: "Success", hospitalLabsResults });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results" });
  }
});
labRoutes.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = HospitalLabsSchema.parse(req.body);
    const updatedHospitalLabs = await prismaClient.hospitalLabs.update({
      where: {
        id,
      },
      data,
    });
    if (!updatedHospitalLabs) {
      return res.status(400).json({ message: "Failed to update lab results" });
    }
    return res.status(201).json({ message: "Success", updatedHospitalLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to update lab results" });
  }
});
labRoutes.delete("/", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedHospitalLabs = await prismaClient.hospitalLabs.delete({
      where: {
        id,
      },
    });
    if (!deletedHospitalLabs) {
      return res.status(400).json({ message: "Failed to delete lab results" });
    }
    return res.status(201).json({ message: "Success", deletedHospitalLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to add lab results" });
  }
});
