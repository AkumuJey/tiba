import { z } from "zod";

export const AppointmentSchema = z.object({
  patientID: z.number().int().positive(),
  appointmentTime: z.string(),
  amount: z.number().positive(),
  venue: z.string(),
  description: z.string().optional(),
});
export const UpdateAppointmentSchema = z.object({
  patientID: z.number().int().positive().optional(),
  appointmentTime: z.string().optional(),
  amount: z.number().positive().optional(),
  venue: z.string().optional(),
  description: z.string().optional(),
});
