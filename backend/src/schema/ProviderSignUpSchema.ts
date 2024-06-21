import { z } from "zod";

export const ProviderSignupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().min(0).max(120).optional(),
  phoneNo: z.string(),
  dateOfBirth: z.string().optional(),
});
