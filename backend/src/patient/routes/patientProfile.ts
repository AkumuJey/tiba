import { Router, Request, Response } from "express";

const patientProfile = Router();

patientProfile.get("/", async (req: Request, res: Response) => {});
patientProfile.patch("/", async (req: Request, res: Response) => {});

export default patientProfile;
