import { Request, Response, Router } from "express";
import { HomeLabsSchema } from "../schemas/HomeLabsSchema";
import { prismaClient } from "../../server";
import { Patient } from "@prisma/client";

interface CustomRequest extends Request {
  user: Patient;
}

const patientLabs = Router();

patientLabs.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const data = HomeLabsSchema.parse(customReq.body);
    const newHomeLabs = await prismaClient.homeLabs.create({
      data: {
        ...data,
        patientID: customReq.user.id,
      },
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
patientLabs.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const homeLabsList = await prismaClient.homeLabs.findMany({
      where: {
        patientID: customReq.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const hospitalLabsList = await prismaClient.hospitalLabs.findMany({
      where: {
        patientID: customReq.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!homeLabsList || hospitalLabsList) {
      return res
        .status(400)
        .json({ message: "Failed to fetch lab results list." });
    }
    const intialList = [...homeLabsList, hospitalLabsList];
    const patientLabs = intialList.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return res.status(200).json({ message: "Success", patientLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results list" });
  }
});
patientLabs.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const patientLabs = await prismaClient.homeLabs.findFirst({
      where: {
        id,
        patientID: customReq.user.id,
      },
    });
    if (!patientLabs) {
      return res.status(400).json({ message: "Failed to fetch lab results" });
    }
    return res.status(200).json({ message: "Success", patientLabs });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Failed to fetch lab results" });
  }
});
patientLabs.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const data = HomeLabsSchema.parse(customReq.body);
    const updatedHomeLabs = await prismaClient.homeLabs.update({
      where: {
        id,
        patientID: customReq.user.id,
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
patientLabs.delete("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const deletedHomeLabs = await prismaClient.homeLabs.delete({
      where: {
        id,
        patientID: customReq.user.id,
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

export default patientLabs;
