import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import rootRoute from "./rootRoute";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the URL of your React app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable Access-Control-Allow-Credentials
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/", rootRoute);

export const prismaClient = new PrismaClient({
  log: ["query"],
});
const PORT = 4000;

app.listen(PORT, () => {
  console.log("App working");
  console.log(PORT);
});
