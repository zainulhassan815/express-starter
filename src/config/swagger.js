import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./swagger-config.js";

const options = {
  definition: swaggerConfig,
  apis: ["./src/routes/*.js"], // Path to route files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
