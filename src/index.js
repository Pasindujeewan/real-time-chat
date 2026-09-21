import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { socketAuth } from "./sockets/socket.middleware.js";

import { connectDB } from "./config/db.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use(socketAuth);

await connectDB();

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
