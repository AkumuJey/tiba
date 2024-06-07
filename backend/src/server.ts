import { PrismaClient } from "@prisma/client";
import express from "express";
// import cors from "cors";
import rootRoute from "../rootRoute";

const app = express();

app.use(express.json());

// app.use(cors());

// app.get("/", (req, res) => {
//   console.log("working at server");
// });

app.use("/", rootRoute);

export const prismaClient = new PrismaClient({
  log: ["query"],
});
const PORT = 4000;

app.listen(PORT, () => {
  console.log("App working");
  console.log(PORT);
});
