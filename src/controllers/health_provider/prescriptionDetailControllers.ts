import { Request, Response } from "express";
import { DrugSchema, PrescriptioSchema } from "../../schema/PrescriptionSchema";
import { prismaClient } from "../../server";

export const deletePrescriptionDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedPrescriptionDetail =
      await prismaClient.prescriptionDetail.delete({
        where: {
          id,
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
    const prescriptionID = parseInt(req.body.id, 10);
    const deletedPrescriptionDetails =
      await prismaClient.prescriptionDetail.deleteMany({
        where: {
          prescriptionID,
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
    const id = parseInt(req.body.id, 10);
    const updateData = DrugSchema.parse(req.body);
    const updatedPrescriptionDetail =
      await prismaClient.prescriptionDetail.update({
        where: {
          id,
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
