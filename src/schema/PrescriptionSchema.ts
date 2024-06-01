import { z } from "zod";

const drugSchema = z.object({
  quantity: z.number().int().positive(),
  units: z.string(),
  route: z.string(),
  drugName: z.string(),
  durationInDays: z.number().int().positive(),
});
export const PrescriptioSchema = z.object({
  patientID: z.number().int().positive(),
  healthcareProviderID: z.number().int().positive(),
  date: z.string(),
  instruction: z.string().nullable().optional(),
  drugs: z.array(drugSchema),
});
