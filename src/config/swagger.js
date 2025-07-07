import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Clothing Store API",
      version: "1.0.0",
      description: "API documentation for your personal clothing store backend",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to route files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
