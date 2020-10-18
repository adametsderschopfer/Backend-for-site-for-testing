import dotenv from "dotenv";
import path from "path";

const root = path.join.bind(this, __dirname, "../../");
dotenv.config({ path: root(".env") });

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = !isProduction;

export const mongoLogin = process.env.MONGO_LOGIN;
export const mongoPassword = process.env.MONGO_PASSWORD;
export const dbName = process.env.DB_NAME;
export const port = process.env.PORT;
