import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../server";

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  //   if no token response
  if (!token) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRECT as string) as any;
    const user = prismaClient.patient.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return res.status(401).json({
        error: "Please authenticate using a valid token",
      });
    }
    // req.user = user;
    next();
  } catch (error) {
    // return error with status code
    res.status(401).json({
      error,
    });
  }
};
