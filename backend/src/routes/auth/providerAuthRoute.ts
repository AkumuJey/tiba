import { Router } from "express";
import {
  providerLoginController,
  providerLogoutController,
  providerSignupController,
} from "../../controllers/providerAuthController";

export const providerLoginRoute = Router();

providerLoginRoute.post("/", providerLoginController);
export const providerLogoutRoute = Router();

providerLogoutRoute.post("/", providerLogoutController);

export const providerSignupRoute = Router();

providerSignupRoute.post("/", providerSignupController);
