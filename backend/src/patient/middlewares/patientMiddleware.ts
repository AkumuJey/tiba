import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { HealthcareProvider, Patient } from "@prisma/client";
import { prismaClient } from "../../server";

interface CustomRequest extends Request {
  user: Patient | HealthcareProvider; // Changed to non-optional
}

const patientMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  //   if no token response
  if (!token) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
    });
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.PATIENT_JWT_SECRET as string
    ) as any;
    const user = await prismaClient.patient.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return res.status(401).json({
        error: "Please authenticate using a valid token",
      });
    }
    (req as CustomRequest).user = user; // Use type assertion to add user
    next();
  } catch (error) {
    // return error with status code
    res.status(401).json({
      error,
    });
  }
};

export default patientMiddleware;
