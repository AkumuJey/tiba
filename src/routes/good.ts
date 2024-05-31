import { Router } from "express";
import { authMiddleWare } from "../middlewares/authMiddleWare";

export const goodRoute = Router();

goodRoute.get("/", authMiddleWare, (req, res) => {
  res.json({
    message: "Good route",
  });
});
