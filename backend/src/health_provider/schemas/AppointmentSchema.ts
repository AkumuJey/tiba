import { z } from "zod";

export const AppointmentSchema = z.object({
  appointmentTime: z.string(),
  amount: z.number().positive(),
  venue: z.string(),
  description: z.string().optional(),
});
export const UpdateAppointmentSchema = z.object({
  appointmentTime: z.string().optional(),
  amount: z.number().positive().optional(),
  venue: z.string().optional(),
  description: z.string().optional(),
});
