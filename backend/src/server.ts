import express from "express";
import { patientIndexRoute } from "./routes/patientIndexRoute";
import { PrismaClient } from "@prisma/client";
import { providerIndexRoute } from "./routes/providerIndexRoute";

const app = express();

app.use(express.json());

app.use("/patient", patientIndexRoute);
app.use("/provider", providerIndexRoute);

export const prismaClient = new PrismaClient({
  log: ["query"],
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log("App working");
  console.log(PORT);
});
