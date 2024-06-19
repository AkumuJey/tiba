import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../server";
import * as jwt from "jsonwebtoken";
import { LoginSchema } from "../schema/LoginSchema";
import { ProviderSignupSchema } from "../schema/ProviderSignUpSchema";

export const providerLoginController = async (req: Request, res: Response) => {
  try {
    LoginSchema.parse(req.body);
    const { email, password } = req.body;
    let provider = await prismaClient.healthcareProvider.findFirst({
      where: { email },
    });
    if (!provider) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const checkPassword = compareSync(
      password + process.env.SECRET_HASH_PHRASE,
      provider.password
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: provider.id,
      },
      process.env.PROVIDER_JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      id: provider.id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

export const providerLogoutController = (req: Request, res: Response) => {
  // Clear the cookie
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

export const providerSignupController = async (req: Request, res: Response) => {
  try {
    ProviderSignupSchema.parse(req.body);
    const { firstName, lastName, title, email, password, age, phoneNo } =
      req.body;
    let provider = await prismaClient.healthcareProvider.findFirst({
      where: { email },
    });
    if (provider) {
      return res
        .status(400)
        .json({ message: "Healthcare provider already exists." });
    }

    provider = await prismaClient.healthcareProvider.create({
      data: {
        password: hashSync(password + process.env.SECRET_HASH_PHRASE, 10),
        email,
        firstName,
        lastName,
        title,
        phoneNo,
        age,
        verified: false,
      },
    });

    return res.status(201).json({
      provider,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
