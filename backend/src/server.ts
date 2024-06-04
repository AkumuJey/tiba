import { PrismaClient } from "@prisma/client";
import express from "express";
import rootRoute from "../rootRoute";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("working at server");
// });
app.use("/", rootRoute);

export const prismaClient = new PrismaClient({
  log: ["query"],
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log("App working");
  console.log(PORT);
});
