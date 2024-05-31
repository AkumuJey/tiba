import { z } from "zod";

export const PatientSignupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  sex: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
});
