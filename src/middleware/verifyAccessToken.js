import { ApiError } from "../utils/ApiError.js";
import { verifiyAccesstoken } from "../utils/token.js";
import User from "../models/User.js";

export const verifyAccessTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader + "");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError("Access token required", 401, "UNAUTHORIZED");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifiyAccesstoken(token);

    console.log(payload);
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
