import { Request, Response, Router } from "express";
import {
  deleteHistoryController,
  getHistoriesController,
  getSingleHistoryController,
  getSinglePatientHistories,
  postHistoriesController,
  updateHistoryController,
} from "../../controllers/health_provider/providerHistoryRecordControllers";
import { PatientHistorySchema } from "../../schema/PatientDetails";
import { prismaClient } from "../../server";

const providerHistoryRecordRoute = Router();

providerHistoryRecordRoute.post("/", postHistoriesController);
providerHistoryRecordRoute.get("/", getHistoriesController);

providerHistoryRecordRoute.get("/:id", getSingleHistoryController);
providerHistoryRecordRoute.patch("/id", updateHistoryController);
providerHistoryRecordRoute.delete("/:id", deleteHistoryController);

providerHistoryRecordRoute.get("/patient", getSinglePatientHistories);

export default providerHistoryRecordRoute;
