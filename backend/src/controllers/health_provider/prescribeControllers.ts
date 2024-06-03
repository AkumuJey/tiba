import { Request, Response } from "express";
import {
  PrescriptionSchema,
  UpdatePrescriptionSchema,
} from "../../schema/PrescriptionSchema";
import { prismaClient } from "../../server";
import { HealthcareProvider } from "@prisma/client";

interface CustomRequest extends Request {
  user: HealthcareProvider; // Changed to non-optional
}

export const postPrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const { drugs, ...newPrescription } = PrescriptionSchema.parse(
      customReq.body
    );
    const prescription = await prismaClient.$transaction(async (prisma) => {
      const prescription = await prisma.prescription.create({
        data: {
          ...newPrescription,
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
    res.status(400).json({ error, message: "failed to prescribe" });
  }
};
export const getPrescriptionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const prescriptions = await prismaClient.prescription.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        prescriptionDetails: true,
      },
    });
    if (!prescriptions || prescriptions.length === 0) {
      return res.status(400).json({ message: "No prescriptions available" });
    }
    return res.status(201).json({ prescriptions });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescriptions" });
  }
};

export const getPatientSpecificPrescriptionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientID } = req.body;
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
};

export const getSinglePrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prescription = await prismaClient.prescription.findMany({
      where: { id },
      include: {
        prescriptionDetails: true,
      },
    });
    if (!prescription) {
      return res.status(400).json({ message: "Prescription not found" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescription" });
  }
};

export const deletePrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const prescription = await prismaClient.prescription.delete({
      where: { id, healthcareProviderID: customReq.user.id },
    });
    if (!prescription) {
      return res.status(400).json({ message: "Deletion failed" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Deletion failed" });
  }
};
export const deleteAllPrescriptionsController = async (
  req: Request,
  res: Response
) => {
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
};
export const updatePrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const updatedPrescription = UpdatePrescriptionSchema.parse(customReq.body);

    const prescription = await prismaClient.prescription.update({
      where: { id, healthcareProviderID: customReq.user.id },
      data: updatedPrescription,
    });
    if (!prescription) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update" });
  }
};
