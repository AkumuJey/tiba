import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../../server";
import * as jwt from "jsonwebtoken";

import { LoginSchema } from "../../schema/LoginSchema";
import { ProviderSignupSchema } from "../../schema/ProviderSignUpSchema";

export const providerLoginController = async (req: Request, res: Response) => {
  try {
    LoginSchema.parse(req.body);
    const { email, password } = req.body;
    let provider = await prismaClient.healthcareProvider.findFirst({
      where: { email },
    });
    if (!provider) {
      return res.status(400).json({ message: "User does not exists." });
    }
    const checkPassword = compareSync(
      password + process.env.SECRET_HASH_PHRASE,
      provider.password
    );
    if (!checkPassword) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: provider.id,
      },
      process.env.PROVIDER_JWT_SECRET as string
    );
    return res.status(201).json({
      provider,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
  res.send("login");
};

export const providerLogoutController = (req: Request, res: Response) => {
  res.send("login");
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
    res.status(400).json({ error: error });
  }
};
