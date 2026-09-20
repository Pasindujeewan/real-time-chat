import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/token.js";

export const verifyRefreshTokenMiddleware = (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new ApiError("");
    }

    const payload = verifyRefreshToken(token);

    // Generate new access token here
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
