import { createClient } from "redis";
import { logger } from "../utils/logger.js";
import { appConfig } from "./env.js";

const redisClient = createClient({
  url: appConfig.redisUrl,
  socket: {
    connectTimeout: 10_000,
  },
});

redisClient.on("error", (err) => logger.error(`Redis Client Error: ${err.message}`));
redisClient.on("connect", () => logger.info("Redis client connected successfully"));

export { redisClient };
