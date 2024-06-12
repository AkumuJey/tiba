import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}
const getPatients = Router();

getPatients.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const limit = customReq.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const patients = await prismaClient.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        sex: true,
        dateOfBirth: true,
      },
      take: limit,
    });
    res.status(200).json({ message: "success", patients });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
});
getPatients.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const patient = await prismaClient.patient.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        sex: true,
      },
    });
    res.status(200).json({ message: "success", patient });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
});

export default getPatients;
