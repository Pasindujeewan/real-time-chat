import { ApiError } from "../utils/ApiError.js";
import { verifiyAccesstoken } from "../utils/token.js";
import User from "../models/User.js";

export const verifyAccessTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError("Access token required", 401, "UNAUTHORIZED");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub);
    if (!user) {
      throw new ApiError("User not found", 401, "UNAUTHORIZED");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyAccessTokenMiddleware;
