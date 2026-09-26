import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import argon2 from "argon2";

// Register User
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log("register is start");

    if (!username || !email || !password) {
      throw new ApiError(
        "Username, email and password are required",
        400,
        "BAD_REQUEST",
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();
    if (existingUser) {
      throw new ApiError(
        "User with this email or username already exists",
        409,
        "USER_EXISTS",
      );
    }
    const passwordHash = await argon2.hash(password);

    const user = await User.create({
      username,
      email,
      passwordHash: passwordHash,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user, accessToken, refreshToken },
          "User registered successfully",
        ),
      );
  } catch (error) {
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Email and password are required", 400, "BAD_REQUEST");
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      throw new ApiError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    const isValid = await argon2.verify(user.passwordHash, password);
    if (!isValid) {
      throw new ApiError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userData = user.toJSON();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: userData, accessToken, refreshToken },
          "Login successful",
        ),
      );
  } catch (error) {
    next(error);
  }
};

// Refresh Tokens
export const refreshToken = async (req, res, next) => {
  try {
    const userId = req.refreshTokenPayload.sub;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 401, "UNAUTHORIZED");
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Token refreshed successfully",
        ),
      );
  } catch (error) {
    next(error);
  }
};

// Get Current User (Me)
export const getMe = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "User profile fetched"));
  } catch (error) {
    next(error);
  }
};

// Logout User
export const logout = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};
