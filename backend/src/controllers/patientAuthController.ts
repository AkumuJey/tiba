import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../server";
import * as jwt from "jsonwebtoken";
import { PatientSignupSchema } from "../schema/PatientSignupSchema";
import { LoginSchema } from "../schema/LoginSchema";

export const patientLoginController = async (req: Request, res: Response) => {
  try {
    LoginSchema.parse(req.body);
    const { email, password } = req.body;
    let patient = await prismaClient.patient.findFirst({ where: { email } });
    if (!patient) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const checkPassword = compareSync(
      password + process.env.SECRET_HASH_PHRASE,
      patient.password
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: patient.id,
      },
      process.env.PATIENT_JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      patient,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

export const patientLogoutController = (req: Request, res: Response) => {
  // Clear the cookie
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

export const patientSignupController = async (req: Request, res: Response) => {
  try {
    PatientSignupSchema.parse(req.body);
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      sex,
      address,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body;
    let patient = await prismaClient.patient.findFirst({ where: { email } });
    if (patient) {
      return res.status(400).json({ message: "Patient already exists." });
    }

    patient = await prismaClient.patient.create({
      data: {
        password: hashSync(password + process.env.SECRET_HASH_PHRASE, 10),
        email,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        sex,
        address,
        emergencyContactName,
        emergencyContactPhone,
      },
    });

    return res.status(201).json({
      patient,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
