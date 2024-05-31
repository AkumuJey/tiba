import { Request, Response } from "express";
import { AppointmentSchema } from "../../schema/AppointmentSchema";
import { prismaClient } from "../../server";

export const bookAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    AppointmentSchema.parse(req.body);
    const {
      patientID,
      healthProviderID,
      venue,
      appointmentTime,
      amount,
      description,
    } = req.body;
    const appointment = await prismaClient.appointments.create({
      data: {
        amount,
        patientID,
        healthProviderID,
        venue,
        appointmentTime,
        description,
      },
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
  const { healthProviderID } = req.body;
  try {
    const appointments = await prismaClient.appointments.findMany({
      where: { healthProviderID },
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
  const id = parseInt(req.params.id, 10);
  try {
    const appointment = await prismaClient.appointments.findFirst({
      where: { id },
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
    const id = parseInt(req.params.id, 10);
    AppointmentSchema.parse(req.body);
    const {
      patientID,
      healthProviderID,
      venue,
      appointmentTime,
      amount,
      description,
    } = req.body;
    const updatedAppointment = await prismaClient.appointments.update({
      where: { id },
      data: {
        amount,
        patientID,
        healthProviderID,
        venue,
        appointmentTime,
        description,
      },
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
  const id = parseInt(req.params.id, 10);
  try {
    const deletedAppointment = await prismaClient.appointments.delete({
      where: { id },
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
    const deletedAppointment = await prismaClient.appointments.deleteMany();
    return res
      .status(200)
      .json({ message: "Deleted successfully", deletedAppointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
