import { z } from "zod";

export const PrescriptioSchema = z.object({
  patientID: z.number().int().positive(),
  healthcareProviderID: z.number().int().positive(),
  dosage: z.string(),
  date: z.string(),
  instruction: z.string().nullable().optional(),
});
