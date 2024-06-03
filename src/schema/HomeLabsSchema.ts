import { z } from "zod";

export const HomeLabsSchema = z.object({
  patientID: z.number().int().positive(),
  medicalHistoryID: z.number().int().optional(),
  bloodSugar: z.number(),
  cholesterol: z.number(),
  LDL: z.number(),
  HDL: z.number(),
  triglyceride: z.number(),
  findings: z.string(),
  labName: z.string(),
});
