import { Request, Response, Router } from "express";
import { HomeLabsSchema } from "../../patient/schemas/HomeLabsSchema";
import { prismaClient } from "../../server";

const homeLabRoutes = Router();

homeLabRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const data = HomeLabsSchema.parse(req.body);
    const newHomeLabs = await prismaClient.homeLabs.create({
      data,
    });
    if (!newHomeLabs) {
      return res.status(400).json({ message: "Failed to add lab results" });
    }
    return res.status(201).json({ message: "Success", newHomeLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to add lab results" });
  }
});
homeLabRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const homeLabsResultsList = await prismaClient.homeLabs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!homeLabsResultsList) {
      return res
        .status(400)
        .json({ message: "Failed to fetch lab results list." });
    }
    return res.status(200).json({ message: "Success", homeLabsResultsList });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results list" });
  }
});
homeLabRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const homeLabsResults = await prismaClient.homeLabs.findFirst({
      where: {
        id,
      },
    });
    if (!homeLabsResults) {
      return res.status(400).json({ message: "Failed to fetch lab results" });
    }
    return res.status(200).json({ message: "Success", homeLabsResults });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results" });
  }
});
homeLabRoutes.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = HomeLabsSchema.parse(req.body);
    const updatedHomeLabs = await prismaClient.homeLabs.update({
      where: {
        id,
      },
      data,
    });
    if (!updatedHomeLabs) {
      return res.status(400).json({ message: "Failed to update lab results" });
    }
    return res.status(201).json({ message: "Success", updatedHomeLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to update lab results" });
  }
});
homeLabRoutes.delete("/", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedHomeLabs = await prismaClient.homeLabs.delete({
      where: {
        id,
      },
    });
    if (!deletedHomeLabs) {
      return res.status(400).json({ message: "Failed to delete lab results" });
    }
    return res.status(201).json({ message: "Success", deletedHomeLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to add lab results" });
  }
});
