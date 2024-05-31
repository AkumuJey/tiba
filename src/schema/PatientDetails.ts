import { z } from "zod";

export const PatientHistorySchema = z.object({
  patientID: z.number().int().positive(),
  presentation: z.string(),
  medicalHistory: z.string(),
});
