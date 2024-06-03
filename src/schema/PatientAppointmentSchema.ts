import { z } from "zod";

export const PatientAppointmentSchema = z.object({
  healthProviderID: z.number().int().positive(),
  appointmentTime: z.string(),
  amount: z.number().positive(),
  venue: z.string(),
  description: z.string().optional(),
});
