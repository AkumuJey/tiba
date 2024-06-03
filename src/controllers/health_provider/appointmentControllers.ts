import { Request, Response } from "express";
import {
  AppointmentSchema,
  UpdateAppointmentSchema,
} from "../../schema/AppointmentSchema";
import { prismaClient } from "../../server";
import { HealthcareProvider } from "@prisma/client";

interface CustomRequest extends Request {
  user: HealthcareProvider; // Changed to non-optional
}

export const bookAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const data = AppointmentSchema.parse(customReq.body);
    const appointment = await prismaClient.appointments.create({
      data: { ...data, healthProviderID: customReq.user.id },
    });
    return res.status(201).json({ appointment });
  } catch (error) {
    return res.json({ error });
  }
};

export const getAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const appointments = await prismaClient.appointments.findMany({
      where: { healthProviderID: customReq.user.id },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!appointments || appointments.length === 0) {
      return res.json({ message: "No appointments found" });
    }
    return res.json({ appointments });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getSingleAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const appointment = await prismaClient.appointments.findFirst({
      where: { id, patientID: customReq.user.id },
    });
    if (!appointment) {
      return res.json({ message: "No appointment found" });
    }
    return res.json({ appointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const data = UpdateAppointmentSchema.parse(customReq.body);
    const updatedAppointment = await prismaClient.appointments.update({
      where: { id, healthProviderID: customReq.user.id },
      data,
    });
    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedAppointment });
  } catch (error) {
    return res.json({ error });
  }
};

export const deleteAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id, 10);
    const deletedAppointment = await prismaClient.appointments.delete({
      where: { id, healthProviderID: customReq.user.id },
    });
    return res
      .status(200)
      .json({ message: "Deleted successfully", deletedAppointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteAllAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const deletedAppointment = await prismaClient.appointments.deleteMany({
      where: {
        healthProviderID: customReq.user.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Deleted successfully", deletedAppointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
