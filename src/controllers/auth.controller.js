import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import {
  deleteSavedRefreshTokenFromRedis,
  generateAccessAndRefreshTokens,
  getSavedRefreshTokenFromRedis,
  saveRefreshTokenToRedis,
  verifyRefreshToken,
} from "../utils/auth-utils.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create([{ email, password: hashedPassword }], { session });
    const { password: _password, ...user } = newUsers[0].toObject();

    const tokenPayload = { userId: user._id };
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(tokenPayload);

    await saveRefreshTokenToRedis(user._id, refreshToken);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const tokenPayload = { userId: user._id };
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(tokenPayload);

    await saveRefreshTokenToRedis(user._id, refreshToken);

    const { password: _userPassword, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify refresh token in Redis
    const storedRefreshToken = await getSavedRefreshTokenFromRedis(user._id);
    if (storedRefreshToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const tokenPayload = { userId: user._id };
    const { accessToken, refreshToken: newRefreshToken } =
      generateAccessAndRefreshTokens(tokenPayload);

    await saveRefreshTokenToRedis(user._id, newRefreshToken);

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await deleteSavedRefreshTokenFromRedis(userId);
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    next(error);
  }
};
