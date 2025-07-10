import cors from "cors";
import express from "express";
import helmet from "helmet";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { httpRequestLoggerMiddleware } from "./utils/logger.js";

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(httpRequestLoggerMiddleware);

// Register api routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

export default app;
