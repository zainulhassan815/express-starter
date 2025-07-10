import jwt from "jsonwebtoken";
import ms from "ms";
import { appConfig } from "../config/env.js";
import { redisClient } from "../config/redis.js";

/**
 * Generates a JSON Web Token (JWT).
 * @param {object} params - The parameters for token generation.
 * @param {object} params.payload - The payload to be included in the token.
 * @param {string} params.secret - The secret key for signing the token.
 * @param {string} params.expiresIn - The expiration time for the token (e.g., '1h', '7d').
 * @param {string} params.audience - The audience for the token.
 * @param {string} params.issuer - The issuer of the token.
 * @returns {string} The generated JWT.
 */
export const generateToken = ({ payload, secret, expiresIn, audience, issuer }) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
  });
};

/**
 * Generates an access token.
 * @param {object} payload - The payload to be included in the access token.
 * @returns {string} The generated access token.
 */
export const generateAccessToken = (payload) =>
  generateToken({
    payload: payload,
    secret: appConfig.jwt.accessTokenSecret,
    expiresIn: appConfig.jwt.accessTokenExpiresIn,
    audience: appConfig.jwt.audience,
    issuer: appConfig.jwt.issuer,
  });

/**
 * Generates a refresh token.
 * @param {object} payload - The payload to be included in the refresh token.
 * @returns {string} The generated refresh token.
 */
export const generateRefreshToken = (payload) =>
  generateToken({
    payload: payload,
    secret: appConfig.jwt.refreshTokenSecret,
    expiresIn: appConfig.jwt.refreshTokenExpiresIn,
    audience: appConfig.jwt.audience,
    issuer: appConfig.jwt.issuer,
  });

/**
 * Generates both an access token and a refresh token for a given payload.
 * @param {object} payload - The data to be included in the tokens.
 * @returns {{accessToken: string, refreshToken: string}} An object containing the access and refresh tokens.
 */
export const generateAccessAndRefreshTokens = (payload) => ({
  accessToken: generateAccessToken(payload),
  refreshToken: generateRefreshToken(payload),
});

/**
 * Verifies a JSON Web Token (JWT).
 * @param {object} params - The parameters for token verification.
 * @param {string} params.token - The JWT to verify.
 * @param {string} params.secret - The secret key for verifying the token.
 * @param {string} params.audience - The expected audience of the token.
 * @param {string} params.issuer - The expected issuer of the token.
 * @returns {object} The decoded token payload if verification is successful.
 * @throws {Error} If the token is invalid or verification fails.
 */
export const verifyToken = ({ token, secret, audience, issuer }) => {
  return jwt.verify(token, secret, {
    audience: audience,
    issuer: issuer,
  });
};

/**
 * Verifies an access token.
 * @param {string} token - The access token to verify.
 * @returns {object} The decoded access token payload if verification is successful.
 * @throws {Error} If the token is invalid or verification fails.
 */
export const verifyAccessToken = (token) =>
  verifyToken({
    token: token,
    secret: appConfig.jwt.accessTokenSecret,
    audience: appConfig.jwt.audience,
    issuer: appConfig.jwt.issuer,
  });

/**
 * Verifies a refresh token.
 * @param {string} token - The refresh token to verify.
 * @returns {object} The decoded refresh token payload if verification is successful.
 * @throws {Error} If the token is invalid or verification fails.
 */
export const verifyRefreshToken = (token) =>
  verifyToken({
    token: token,
    secret: appConfig.jwt.refreshTokenSecret,
    audience: appConfig.jwt.audience,
    issuer: appConfig.jwt.issuer,
  });

export const DEFAULT_REFRESH_TOKEN_EXPIRATION = ms(appConfig.jwt.refreshTokenExpiresIn) / 1000;

/**
 * Generates a Redis key for storing a user's refresh token.
 * @param {string} userId - The ID of the user.
 * @returns {string} The Redis key for the user's refresh token.
 */
export const redisRefreshTokenKey = (userId) => `refreshToken:${userId}`;

/**
 * Saves a refresh token to Redis for a given user ID.
 * The token is stored with an expiration time.
 * @param {string} userId - The ID of the user.
 * @param {string} refreshToken - The refresh token to be saved.
 * @param {number} [expiration=REFRESH_TOKEN_EXPIRATION] - The expiration time for the token in seconds.
 *   Defaults to `REFRESH_TOKEN_EXPIRATION`.
 * @returns {Promise<string>} A promise that resolves to 'OK' if the token is saved successfully.
 */
export const saveRefreshTokenToRedis = (
  userId,
  refreshToken,
  expiration = DEFAULT_REFRESH_TOKEN_EXPIRATION,
) => {
  return redisClient.set(redisRefreshTokenKey(userId), refreshToken, {
    expiration: {
      type: "EX",
      value: expiration,
    },
  });
};

/**
 * Retrieves a saved refresh token from Redis for a given user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string | null>} A promise that resolves to the refresh token string if found, or null otherwise.
 */
export const getSavedRefreshTokenFromRedis = (userId) =>
  redisClient.get(redisRefreshTokenKey(userId));

/**
 * Deletes a saved refresh token from Redis for a given user ID.
 * @param {string} userId - The ID of the user whose refresh token is to be deleted.
 */
export const deleteSavedRefreshTokenFromRedis = (userId) =>
  redisClient.del(redisRefreshTokenKey(userId));
