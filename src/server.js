import app from "./app.js";
import connectDB from "./config/database.js";
import { appConfig } from "./config/env.js";
import { logger } from "./utils/logger.js";

const PORT = appConfig.port || 3000;

await connectDB();

app.listen(PORT, () => {
  logger.info(`Server is accessible at http://localhost:${PORT}`);
  logger.info(`API documentation available at http://localhost:${PORT}/docs`);
});
