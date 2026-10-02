import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { socketAuth } from "./sockets/socket.middleware.js";
import { registerChatEvents } from "./sockets/chat.socket.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  registerChatEvents(io, socket);
});

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    httpServer.listen(3000, () => {
      console.log("Listening on :3000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
