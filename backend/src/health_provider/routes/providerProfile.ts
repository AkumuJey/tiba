import { HealthcareProvider } from "@prisma/client";
import { Request, Response, Router } from "express";
import { prismaClient } from "../../server";
interface CustomRequest extends Request {
  user: HealthcareProvider;
}

const providerProfile = Router();

providerProfile.get("/", async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const profile = await prismaClient.healthcareProvider.findFirstOrThrow({
      where: {
        id: customReq.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNo: true,
        title: true,
        verified: true,
      },
    });
    res.status(200).json({ message: "success", profile });
  } catch (error) {
    res.status(400).json({ message: "Failed", error });
  }
});

export default providerProfile;
