import { Patient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { PatientAppointmentSchema } from "../../schema/PatientAppointmentSchema";
import { prismaClient } from "../../server";
interface CustomRequest extends Request {
  user: Patient;
}

const patientAppointmentRoute = Router();
patientAppointmentRoute.post("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const data = PatientAppointmentSchema.parse(customReq.body);
    const newAppointment = await prismaClient.appointments.create({
      data: { ...data, patientID: customReq.user.id },
    });
    if (!newAppointment) {
      return res.status(400).json({ message: "Failed to book Appointment" });
    }
    return res.status(201).json({ message: "success", newAppointment });
  } catch (error) {
    res.status(400).json({
      message: "Failed to book appointment",
      error,
    });
  }
});
patientAppointmentRoute.get("/", async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const data = PatientAppointmentSchema.parse(customReq.body);
    const newAppointment = await prismaClient.appointments.create({
      data: { ...data, patientID: customReq.user.id },
    });
    if (!newAppointment) {
      return res.status(400).json({ message: "Failed to book Appointment" });
    }
    return res.status(201).json({ message: "success", newAppointment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to book Appointment", error });
  }
});
patientAppointmentRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id);
    const appointment = await prismaClient.appointments.findFirst({
      where: {
        id,
        patientID: customReq.user.id,
      },
    });
    if (!appointment) {
      return res.status(400).json({ message: "Failed to fetch Appointment" });
    }
    return res.status(201).json({ message: "success", appointment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to fetch Appointment", error });
  }
});
patientAppointmentRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id);
    const deletedAppointment = await prismaClient.appointments.delete({
      where: {
        id,
        patientID: customReq.user.id,
      },
    });
    if (!deletedAppointment) {
      return res.status(400).json({ message: "Failed to delete Appointment" });
    }
    return res.status(201).json({ message: "success", deletedAppointment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete Appointment", error });
  }
});
patientAppointmentRoute.patch("/:id", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const id = parseInt(customReq.params.id);
    const data = PatientAppointmentSchema.parse(customReq.body);
    const updatedAppointment = await prismaClient.appointments.update({
      where: {
        id,
        patientID: customReq.user.id,
      },
      data,
    });
    if (!updatedAppointment) {
      return res.status(400).json({ message: "Failed to update Appointment" });
    }
    return res.status(201).json({ message: "success", updatedAppointment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update Appointment", error });
  }
});
