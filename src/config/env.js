import dotenv from "dotenv";

dotenv.config();

const appConfig = {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
};

export default appConfig;
