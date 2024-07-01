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

const convertToISO = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toISOString();
};

const prescription = Router({ mergeParams: true });

prescription.use("/details", details);

prescription.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const { drugs, ...newPrescription } = PrescriptionSchema.parse(
      customReq.body
    );
    const prescription = await prismaClient.$transaction(async (prisma) => {
      const prescription = await prisma.prescription.create({
        data: {
          ...newPrescription,
          date: convertToISO(newPrescription.date),
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

    return res.status(201).json({ message: "success", prescription });
  } catch (error) {
    return res.status(400).json({ error, message: "failed to prescribe" });
  }
});

prescription.get("/", async (req: Request, res: Response) => {
  try {
    const patientID = parseInt(req.params.patientID, 10);
    const prescriptions = await prismaClient.prescription.findMany({
      where: { patientID },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!prescriptions) {
      return res.status(400).json({ message: "No prescriptions available" });
    }
    return res.status(201).json({ prescriptions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Failed to fetch prescriptions" });
  }
});

prescription.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID);
    const id = parseInt(customReq.params.id, 10);
    const prescription = await prismaClient.prescription.findUnique({
      where: { id, patientID },
      include: {
        prescriptionDetails: true,
      },
    });
    console.log("Prescription");
    return res
      .status(200)
      .json({ message: "Success", prescription, trivia: "Yes I got here" });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescription" });
  }
});

prescription.delete("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.id);
    const id = parseInt(customReq.params.id, 10);
    console.log("Patient", patientID, "Here: ", id);
    const deletedPrescription = await prismaClient.prescription.delete({
      where: { id, healthcareProviderID: customReq.user.id, patientID },
    });
    console.log("What here: ", deletedPrescription);
    if (!deletedPrescription) {
      return res.status(400).json({ message: "Deletion failed" });
    }
    return res.status(204).json({ message: "Deleted", deletedPrescription });
  } catch (error) {
    console.log(error);
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
      data: {
        ...updatedPrescription,
        date: convertToISO(updatedPrescription?.date as string),
      },
    });
    if (!prescription) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res.status(201).json({ message: "success", id: prescription.id });
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
