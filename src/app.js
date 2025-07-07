import cors from "cors";
import express from "express";
import helmet from "helmet";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import productRoutes from "./routes/product.routes.js";
import { httpRequestLogger } from "./utils/logger.js";

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(httpRequestLogger);

// Register api routes
app.use("/api/products", productRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
