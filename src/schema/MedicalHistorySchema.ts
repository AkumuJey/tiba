import { z } from "zod";

export const MedicalHistorySchema = z.object({
  patientID: z.number().int(),
  presentation: z.string(),
  medicalHistory: z.string(),
  physicalExamination: z.string(),
  summary: z.string(),
  healthProviderID: z.number().int().positive(),
});
