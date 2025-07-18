import express from "express";
import productsRouter from "./product.routes";

const indexRouter = express.Router();

// Register all routes here
indexRouter.use("/products", productsRouter);

export default indexRouter;
