export default {
  openapi: "3.0.0",
  info: {
    title: "Your App Name - API Docs",
    version: "1.0.0",
    description: "API documentation for your Express app",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
  components: {
    schemas: {
      SignUp: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "securePass123",
          },
        },
      },
      SignIn: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            example: "securePass123",
          },
        },
      },
      RefreshToken: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: {
            type: "string",
            example: "your.jwt.token.here",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
    {
      name: "Products",
      description: "Product management endpoints",
    },
  ],
};
