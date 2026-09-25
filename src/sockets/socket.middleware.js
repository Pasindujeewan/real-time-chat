import { ApiError } from "../utils/ApiError.js";
import { verifiyAccesstoken } from "../utils/token.js";

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.auth; //remove when production
  console.log(socket);
  console.log(token);
  try {
    const decoded = verifiyAccesstoken(token);

    socket.user = decoded;
    console.log(decoded);
    next();
  } catch (e) {
    console.log(e);
    next(new ApiError("Unauthorized", 402, "UNAUTHRIZED"));
  }
};
