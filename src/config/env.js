import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TIME,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TIME,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  },
};
