import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
import history from "../routes/history";
import labs from "../routes/labs";
import prescription from "../routes/prescription";
import appointments from "../routes/appointments";
import vitals from "../routes/vitals";
interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const selectedPatients = Router({ mergeParams: true });

selectedPatients.get("/", (req, res) => {
  console.log("Here it is: ", req.params);
  res.json({ params: req.params });
});
selectedPatients.use("/histories", history);
selectedPatients.use("/vitals", vitals);
selectedPatients.use("/labs", labs);
selectedPatients.use("/prescription", prescription);
selectedPatients.use("/prescription-detail", prescription);
selectedPatients.use("/appointments", appointments);
selectedPatients.get(
  "/appointments/all",
  async (req: Request, res: Response) => {
    try {
      const customReq = req as CustomRequest;
      const appointments = await prismaClient.appointments.findMany({
        where: { healthProviderID: customReq.user.id },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!appointments || appointments.length === 0) {
        return res.json({ message: "No appointments found" });
      }
      return res.json({ appointments });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);
selectedPatients.get(
  "/prescription/all",
  async (req: Request, res: Response) => {
    try {
      const prescriptions = await prismaClient.prescription.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          prescriptionDetails: true,
        },
      });
      if (!prescriptions || prescriptions.length === 0) {
        return res.status(400).json({ message: "No prescriptions available" });
      }
      return res.status(201).json({ prescriptions });
    } catch (error) {
      res.status(400).json({ error, message: "Failed to fetch prescriptions" });
    }
  }
);

export default selectedPatients;
