import { ApiError } from "../utils/ApiError";

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = verifyAccessToken(token);

    socket.user = decoded;

    next();
  } catch {
    next(new ApiError("Unauthorized", 402, "UNAUTHRIZED"));
  }
};
