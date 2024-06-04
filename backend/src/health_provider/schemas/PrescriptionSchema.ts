import { z } from "zod";

export const DrugSchema = z.object({
  quantity: z.number().int().positive(),
  units: z.string(),
  route: z.string(),
  drugName: z.string(),
  durationInDays: z.number().int().positive(),
});

export const PrescriptionSchema = z.object({
  date: z.string(),
  instruction: z.string().nullable().optional(),
  drugs: z.array(DrugSchema),
});

export const UpdateDrugSchema = z.object({
  quantity: z.number().int().positive().optional(),
  units: z.string().optional(),
  route: z.string().optional(),
  drugName: z.string().optional(),
  durationInDays: z.number().int().positive().optional(),
});

export const UpdatePrescriptionSchema = z.object({
  date: z.string().optional(),
  instruction: z.string().nullable().optional(),
});
