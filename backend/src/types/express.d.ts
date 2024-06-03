import express from "express";
import { HealthcareProvider, Patient } from "@prisma/client";

declare module "express" {
  export interface Request {
    user?: Patient | HealthcareProvider;
  }
}
