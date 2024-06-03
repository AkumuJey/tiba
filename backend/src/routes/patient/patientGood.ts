import { Router, Request, Response } from "express";
import { HealthcareProvider, Patient } from "@prisma/client";
import patientAuthMiddleWare from "../../middlewares/patientAuthMiddleWare";

interface CustomRequest extends Request {
  user?: Patient | HealthcareProvider;
}

export const patientGood = Router();

patientGood.get(
  "/",
  patientAuthMiddleWare,
  (req: CustomRequest, res: Response) => {
    console.log(req);
    res.json({
      message: "Good route",
      user: req.user,
    });
  }
);
