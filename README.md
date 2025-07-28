# Express Starter JS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![gitleaks badge](https://img.shields.io/badge/protected%20by-gitleaks-blue)

A robust and feature-rich starter template for building RESTful APIs with Express.js. This project is configured with modern tools for logging, documentation, code quality, and security.

## Features

- **Framework**: [Express.js](https://expressjs.com/) v5 (beta) for building the API.
- **Logging**: Comprehensive logging with [Winston](https://github.com/winstonjs/winston) and HTTP request logging with [Morgan](https://github.com/expressjs/morgan).
- **API Documentation**: Automatic API documentation generation with [Swagger (OpenAPI)](https://swagger.io/) using `swagger-jsdoc` and `swagger-ui-express`.
- **Security**: Basic security headers set with Helmet.
- **CORS Ready**: Pre-configured CORS support.
- **Database**: Includes Mongoose for MongoDB object data modeling.
- **Validation**: Request validation with [Zod](https://zod.dev/).
- **Code Quality**: Linting and formatting enforced by Biome.
- **Git Hooks**: Pre-commit hooks with Husky and lint-staged to ensure code standards.
- **ES Modules**: Uses modern ES Modules syntax (`import`/`export`).
- **Environment Variables**: Centralized configuration using `dotenv`.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or any other package manager
- MongoDB instance (local or remote)

## Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/express-starter-js.git
cd express-starter-js
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, you can modify the `.env` file with your specific configuration.

```env
# .env
PORT=3000
LOG_LEVEL=info
MONGO_URI=mongodb://localhost:27017/express-starter-db
```

## Available Scripts

This project comes with several pre-configured npm scripts:

- **`npm run dev`**: Starts the development server using `nodemon`, which automatically restarts the server on file changes.
- **`npm start`**: Starts the application in production mode.
- **`npm run lint`**: Lints the codebase using Biome.
- **`npm run lint:fix`**: Lints and automatically fixes issues found by Biome.

## API Documentation

Once the server is running, you can access the Swagger API documentation in your browser:

**URL**: `http://localhost:3000/docs`

The API endpoints are prefixed with `/api`. For example, the products endpoint is accessible at `http://localhost:3000/api/products`.

The documentation is automatically generated from the JSDoc comments in your route files (e.g., `./src/routes/*.js`).

## Logging

The application uses Winston for robust logging. Logs are output to both the console and files located in the `logs/` directory.

- **`logs/combined.log`**: All logs.
- **`logs/error.log`**: Only `error` level logs.
- **`logs/http.log`**: All HTTP request logs from Morgan.
- **`logs/exceptions.log`**: Logs for any uncaught exceptions.

The log level can be configured via the `LOG_LEVEL` environment variable.

## Folder Structure

```text
src
├── config/         # Configuration files (e.g., swagger.js)
├── controllers/    # Route handlers and business logic
├── middlewares/    # Custom Express middlewares
├── models/         # Mongoose models
├── routes/         # API route definitions
├── utils/          # Utility functions (e.g., logger.js)
├── validations/    # Zod validation schemas
├── app.js          # Express application setup and middleware
└── server.js       # Server entry point
```

## Linting and Formatting

This project uses Biome to enforce a consistent code style. A pre-commit hook is set up with Husky and lint-staged to automatically format and lint your code before you commit.

You can manually run the linter with:

```bash
npm run lint
npm run lint:fix
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
