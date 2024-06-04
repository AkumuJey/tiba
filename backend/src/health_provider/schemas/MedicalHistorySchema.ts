import { z } from "zod";

export const MedicalHistorySchema = z.object({
  presentation: z.string(),
  medicalHistory: z.string(),
  physicalExamination: z.string(),
  summary: z.string(),
});

export const UpdateMedicalHistorySchema = z.object({
  presentation: z.string().optional(),
  medicalHistory: z.string().optional(),
  physicalExamination: z.string().optional(),
  summary: z.string().optional(),
});
