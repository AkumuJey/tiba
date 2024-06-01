import { z } from "zod";

export const PatientHistorySchema = z.object({
  patientID: z.number().int().positive(),
  healthProviderID: z.number().int().positive(),
  presentation: z.string(),
  medicalHistory: z.string(),
});
export const PatientHistoryUpdateSchema = z.object({
  patientID: z.number().int().positive(),
  presentation: z.string().optional(),
  medicalHistory: z.string().optional(),
});
