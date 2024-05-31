import { z } from "zod";

export const AppointmentSchema = z.object({
  patientID: z.number().int().positive(),
  healthProviderID: z.number().int().positive(),
  appointmentTime: z.string(),
  amount: z.number().positive(),
  venue: z.string(),
  description: z.string().optional(),
});
