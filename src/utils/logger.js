import morgan from "morgan";
import winston from "winston";
import { appConfig } from "../config/env.js";

const { combine, colorize, printf, timestamp, json, errors } = winston.format;

const httpFormat = printf(({ message }) => message.trim());
const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${typeof message === "object" ? JSON.stringify(message) : message}`;
  }),
);
const defaultFormat = combine(
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss.SSS A",
  }),
  json(),
  errors({ stack: true }),
);

const logger = winston.createLogger({
  level: appConfig.logLevel || "info",
  format: defaultFormat,
  transports: [
    new winston.transports.Console({ level: "silly", format: consoleFormat }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 2 * 1024 * 1024, // 2 MB
      maxFiles: 5,
      tailable: true,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5 * 1024 * 1024, // 5 MB
      maxFiles: 5,
      tailable: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
      maxsize: 1 * 1024 * 1024, // 1 MB
      maxFiles: 3,
      tailable: true,
    }),
  ],
});

const httpLogger = winston.createLogger({
  level: "http",
  format: httpFormat,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: "logs/http.log",
      level: "http",
      format: httpFormat,
      maxsize: 2 * 1024 * 1024, // 2 MB
      maxFiles: 3,
      tailable: true,
    }),
  ],
});

logger.stream = {
  write: (message) => httpLogger.http(message.trim()),
};

const httpRequestLoggerMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
    }),
  { stream: logger.stream },
);

export { logger, httpRequestLoggerMiddleware };
