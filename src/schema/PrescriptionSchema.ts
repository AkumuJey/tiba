import { z } from "zod";

export const DrugSchema = z.object({
  quantity: z.number().int().positive(),
  units: z.string(),
  route: z.string(),
  drugName: z.string(),
  durationInDays: z.number().int().positive(),
  prescriptionID: z.number().int().positive().optional(),
});
export const PrescriptioSchema = z.object({
  patientID: z.number().int().positive(),
  healthcareProviderID: z.number().int().positive(),
  date: z.string(),
  instruction: z.string().nullable().optional(),
  drugs: z.array(DrugSchema),
});
