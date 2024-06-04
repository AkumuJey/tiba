import { Patient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { PatientAppointmentSchema } from "../../schema/PatientAppointmentSchema";
import { prismaClient } from "../../server";
interface CustomRequest extends Request {
  user: Patient;
}

const patientAppointment = Router();

patientAppointment.post("/", async (req: Request, res: Response) => {
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
patientAppointment.get("/", async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const appointments = await prismaClient.appointments.findMany({
      where: { patientID: customReq.user.id },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!appointments) {
      return res.status(400).json({ message: "Failed to fetch appointments" });
    }
    return res.status(201).json({ message: "success", appointments });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to fetch appointments", error });
  }
});
patientAppointment.get("/:id", async (req: Request, res: Response) => {
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
patientAppointment.delete("/:id", async (req: Request, res: Response) => {
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
patientAppointment.patch("/:id", async (req: Request, res: Response) => {
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

export default patientAppointment;
