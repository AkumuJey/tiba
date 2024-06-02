import { Router } from "express";
import {
  deleteHistoryController,
  getHistoriesController,
  getSingleHistoryController,
  getSinglePatientHistories,
  postHistoriesController,
  updateHistoryController,
} from "../../controllers/health_provider/providerHistoryRecordControllers";

const providerHistoryRecordRoute = Router();

providerHistoryRecordRoute.post("/", postHistoriesController);
providerHistoryRecordRoute.get("/", getHistoriesController);

providerHistoryRecordRoute.get("/:id", getSingleHistoryController);
providerHistoryRecordRoute.patch("/id", updateHistoryController);
providerHistoryRecordRoute.delete("/:id", deleteHistoryController);

providerHistoryRecordRoute.get("/patient", getSinglePatientHistories);

export default providerHistoryRecordRoute;
