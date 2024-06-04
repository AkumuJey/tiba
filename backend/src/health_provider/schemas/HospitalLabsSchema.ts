import { z } from "zod";

export const HospitalLabsSchema = z.object({
  bloodSugar: z.number(),
  cholesterol: z.number(),
  LDL: z.number(),
  HDL: z.number(),
  triglyceride: z.number(),
  findings: z.string(),
  labName: z.string(),
});
export const UpdateHospitalLabsSchema = z.object({
  bloodSugar: z.number().optional(),
  cholesterol: z.number().optional(),
  LDL: z.number().optional(),
  HDL: z.number().optional(),
  triglyceride: z.number().optional(),
  findings: z.string().optional(),
  labName: z.string().optional(),
});
