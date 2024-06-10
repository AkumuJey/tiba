import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";

interface CustomRequest extends Request {
  user: HealthcareProvider;
}
const getPatients = Router();

getPatients.get("/", async (req, res) => {
  try {
    const customReq = req as CustomRequest;
    const patients = await prismaClient.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        sex: true,
      },
    });
    res.status(200).json({ message: "success", patients });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
});

export default getPatients;
