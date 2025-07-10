import express from "express";
import { refreshAccessToken, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { refreshTokenSchema, signInSchema, signUpSchema } from "../validations/auth.schema.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 */
router.post("/signup", validateRequest({ body: signUpSchema }), signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/signin", validateRequest({ body: signInSchema }), signIn);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: New access token issued
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh", validateRequest({ body: refreshTokenSchema }), refreshAccessToken);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: Sign out user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/signout", authorize, signOut);

export default router;
