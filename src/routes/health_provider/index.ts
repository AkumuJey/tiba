import { Router } from "express";

export const healthProviderRoute = Router();

healthProviderRoute.get("/", (req, res) => {
  res.send("Health Provider API is running");
});
