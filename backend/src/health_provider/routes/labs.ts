import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import {
  HospitalLabsSchema,
  UpdateHospitalLabsSchema,
} from "../schemas/HospitalLabsSchema";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const labs = Router({ mergeParams: true });

labs.post("/", async (req: Request, res: Response) => {
  try {
    const custmonReq = req as CustomRequest;
    const patientID = parseInt(custmonReq.params.patientID);
    const data = HospitalLabsSchema.parse(custmonReq.body);
    const newHospitalLabs = await prismaClient.hospitalLabs.create({
      data: {
        ...data,
        healthProviderID: custmonReq.user.id,
        patientID,
      },
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

labs.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const hospitalLabsResultsList = await prismaClient.hospitalLabs.findMany({
      where: {
        patientID,
        healthProviderID: customReq.user.id,
      },
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
labs.get("/all", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const hospitalLabsResultsList = await prismaClient.hospitalLabs.findMany({
      where: {
        patientID,
      },
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

labs.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const id = parseInt(customReq.params.id, 10);
    const hospitalLabsResults = await prismaClient.hospitalLabs.findFirst({
      where: {
        id,
        patientID,
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

labs.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const id = parseInt(customReq.params.id, 10);
    const data = UpdateHospitalLabsSchema.parse(customReq.body);
    const updatedHospitalLabs = await prismaClient.hospitalLabs.update({
      where: {
        id,
        patientID,
        healthProviderID: customReq.user.id,
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

labs.delete("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const id = parseInt(customReq.params.id, 10);
    const deletedHospitalLabs = await prismaClient.hospitalLabs.delete({
      where: {
        id,
        patientID,
        healthProviderID: customReq.user.id,
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
export default labs;
