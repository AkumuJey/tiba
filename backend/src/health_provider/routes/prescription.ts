import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import {
  PrescriptionSchema,
  UpdatePrescriptionSchema,
} from "../schemas/PrescriptionSchema";
import details from "./prescriptionDetails";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const prescription = Router();

prescription.use("/details", details);

prescription.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const { drugs, ...newPrescription } = PrescriptionSchema.parse(
      customReq.body
    );
    const prescription = await prismaClient.$transaction(async (prisma) => {
      const prescription = await prisma.prescription.create({
        data: {
          ...newPrescription,
          patientID,
          healthcareProviderID: customReq.user.id,
        },
      });
      const drugList = drugs.map((drug) => ({
        ...drug,
        prescriptionID: prescription.id,
        healthcareProviderID: customReq.user.id,
      }));
      const prescriptionDetail = await prisma.prescriptionDetail.createMany({
        data: drugList,
      });
      return { ...prescription, prescriptionDetail };
    });

    return res.status(201).json({ data: { prescription } });
  } catch (error) {
    return res.status(400).json({ error, message: "failed to prescribe" });
  }
});

prescription.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const prescriptions = await prismaClient.prescription.findMany({
      where: { patientID },
      include: {
        prescriptionDetails: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!prescriptions || prescriptions.length === 0) {
      return res.status(400).json({ message: "No prescriptions available" });
    }
    return res.status(201).json({ prescriptions });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescriptions" });
  }
});

prescription.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const id = parseInt(customReq.params.id, 10);
    const prescription = await prismaClient.prescription.findFirstOrThrow({
      where: { id, patientID },
      include: {
        prescriptionDetails: true,
      },
    });
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescription" });
  }
});

prescription.delete("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const id = parseInt(customReq.params.id, 10);
    const prescription = await prismaClient.prescription.delete({
      where: { id, healthcareProviderID: customReq.user.id, patientID },
    });
    if (!prescription) {
      return res.status(400).json({ message: "Deletion failed" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Deletion failed" });
  }
});

prescription.patch("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const id = parseInt(customReq.params.id, 10);
    const updatedPrescription = UpdatePrescriptionSchema.parse(customReq.body);

    const prescription = await prismaClient.prescription.update({
      where: { id, healthcareProviderID: customReq.user.id, patientID },
      data: updatedPrescription,
    });
    if (!prescription) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update" });
  }
});

prescription.delete("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const prescription = await prismaClient.prescription.deleteMany({
      where: {
        healthcareProviderID: customReq.user.id,
      },
    });
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Deletion failed" });
  }
});

export default prescription;
