import { z } from "zod";

export const HospitalLabsSchema = z.object({
  patientID: z.number().int().positive(),
  bloodSugar: z.number(),
  cholesterol: z.number(),
  LDL: z.number(),
  HDL: z.number(),
  triglyceride: z.number(),
  findings: z.string(),
  labName: z.string(),
});
