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
      return res.status(400).json({ message: "User does not exists." });
    }
    const checkPassword = compareSync(
      password + process.env.SECRET_HASH_PHRASE,
      patient.password
    );
    if (!checkPassword) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: patient.id,
      },
      process.env.PATIENT_JWT_SECRET as string
    );
    return res.status(201).json({
      patient,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const patientLogoutController = (req: Request, res: Response) => {
  res.send("login");
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
    res.status(400).json({ error: error });
  }
};
