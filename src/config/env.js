import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
};
