import { config } from "dotenv";

config({ path: ".env" });

export const PORT = process.env.PORT;

export const SECRET_HASH_PHRASEs = process.env.SECRET_HASH_PHRASE;
