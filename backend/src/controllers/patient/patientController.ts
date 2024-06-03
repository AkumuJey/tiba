import { Request, Response } from "express";
export const patientController = (req: Request, res: Response) => {
  res.send("Patient Route");
};
