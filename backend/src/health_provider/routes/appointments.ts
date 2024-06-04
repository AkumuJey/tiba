import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import {
  AppointmentSchema,
  UpdateAppointmentSchema,
} from "../schemas/AppointmentSchema";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const appointments = Router();

appointments.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const data = AppointmentSchema.parse(customReq.body);
    const appointment = await prismaClient.appointments.create({
      data: { ...data, healthProviderID: customReq.user.id, patientID },
    });

    if (!appointment) {
      return res.status(400).json({ message: "Failed to book appointment" });
    }
    return res.status(201).json({ message: "Success", appointment });
  } catch (error) {
    return res.json({ error });
  }
});

appointments.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const appointments = await prismaClient.appointments.findMany({
      where: { healthProviderID: customReq.user.id, patientID },
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
});

appointments.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const appointment = await prismaClient.appointments.findFirstOrThrow({
      where: { id, patientID, healthProviderID: customReq.user.id },
    });
    return res.json({ appointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

appointments.patch("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const data = UpdateAppointmentSchema.parse(customReq.body);
    const updatedAppointment = await prismaClient.appointments.update({
      where: { id, healthProviderID: customReq.user.id, patientID },
      data,
    });
    if (!updatedAppointment) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedAppointment });
  } catch (error) {
    return res.json({ error, message: "Failed to update" });
  }
});

appointments.delete("/id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const patientID = parseInt(customReq.params.patientID, 10);
    const id = parseInt(customReq.params.id, 10);
    const deletedAppointment = await prismaClient.appointments.delete({
      where: { id, healthProviderID: customReq.user.id, patientID },
    });
    return res
      .status(200)
      .json({ message: "Deleted successfully", deletedAppointment });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

appointments.delete("/", async (req: Request, res: Response) => {
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
});

export default appointments;
