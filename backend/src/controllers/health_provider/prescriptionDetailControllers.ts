import { Request, Response } from "express";
import { UpdateDrugSchema } from "../../health_provider/schemas/PrescriptionSchema";
import { prismaClient } from "../../server";
import { HealthcareProvider } from "@prisma/client";

interface CustomRequest extends Request {
  user: HealthcareProvider; // Changed to non-optional
}

export const deletePrescriptionDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const deletedPrescriptionDetail =
      await prismaClient.prescriptionDetail.delete({
        where: {
          id,
          healthcareProviderID: customReq.user.id,
        },
      });
    res
      .status(200)
      .json({ message: "Deleted successfully", deletedPrescriptionDetail });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const deleteAllPrescriptionDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const prescriptionID = parseInt(customReq.params.id, 10);
    const deletedPrescriptionDetails =
      await prismaClient.prescriptionDetail.deleteMany({
        where: {
          prescriptionID,
          healthcareProviderID: customReq.user.id,
        },
      });
    res.status(200).json({
      message: "Deleted all prescription details",
      deletedPrescriptionDetails,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const updatePrescriptionDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const updateData = UpdateDrugSchema.parse(customReq.body);
    const updatedPrescriptionDetail =
      await prismaClient.prescriptionDetail.update({
        where: {
          id,
          healthcareProviderID: customReq.user.id,
        },
        data: updateData,
      });
    res
      .status(200)
      .json({ message: "Updated successfully", updatedPrescriptionDetail });
  } catch (error) {
    res.status(400).json({ error });
  }
};
