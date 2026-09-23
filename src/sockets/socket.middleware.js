import { ApiError } from "../utils/ApiError.js";
import { verifiyAccesstoken } from "../utils/token.js";

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = verifiyAccesstoken(token);

    socket.user = decoded;

    next();
  } catch {
    next(new ApiError("Unauthorized", 402, "UNAUTHRIZED"));
  }
};
