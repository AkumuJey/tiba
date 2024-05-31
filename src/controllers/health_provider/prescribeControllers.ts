import { Request, Response } from "express";
import { PrescriptioSchema } from "../../schema/PrescriptionSchema";
import { prismaClient } from "../../server";

export const postPrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    PrescriptioSchema.parse(req.body);
    const { patientID, healthcareProviderID, dosage, date, instruction } =
      req.body;

    const prescription = await prismaClient.prescription.create({
      data: {
        patientID,
        date,
        dosage,
        healthcareProviderID,
        instruction,
      },
    });
    if (!prescription) {
      return res.status(400).json({ message: "failed to prescribe" });
    }
    return res.status(201).json({ prescription });
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
    });
    if (!prescriptions || prescriptions.length === 0) {
      return res.status(400).json({ message: "No prescriptions available" });
    }
    return res.status(201).json({ prescriptions });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to fetch prescriptions" });
  }
};

export const getPatientSpecificPrescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientID } = req.body;
    const prescriptions = await prismaClient.prescription.findMany({
      where: { patientID },
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
    const id = parseInt(req.body.id, 10);
    const prescription = await prismaClient.prescription.findMany({
      where: { id },
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
    const id = parseInt(req.body.id, 10);
    const prescription = await prismaClient.prescription.delete({
      where: { id },
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
    const prescription = await prismaClient.prescription.deleteMany();
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
    PrescriptioSchema.parse(req.body);
    const id = parseInt(req.body.id, 10);
    const { patientID, healthcareProviderID, dosage, date, instruction } =
      req.body;
    const prescription = await prismaClient.prescription.update({
      where: { id },
      data: {
        patientID,
        date,
        dosage,
        healthcareProviderID,
        instruction,
      },
    });
    if (!prescription) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res.status(201).json({ prescription });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update" });
  }
};
