import { z } from "zod";

export const HomeVitalsSchema = z.object({
  patientID: z.number().int().positive(),
  breathingRate: z.number().int(),
  systolicBP: z.number().int(),
  diastolicBP: z.number().int(),
  pulseRate: z.number().int(),
  weightKg: z.number().positive(),
});
