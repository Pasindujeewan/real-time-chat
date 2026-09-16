import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log("message from user", socket.id, "message is", message);
  });

  socket.emit("message", "hello from server");

  socket.on("joinConversation", (data) => {
    console.log("joinConversation data", data);
    const { userId, otherUserId } = JSON.parse(data);
    const roomId = [userId, otherUserId].sort().join("_");

    socket.join(roomId);

    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage data", data);
    const { senderId, receiverId, text } = JSON.parse(data);
    const roomId = [senderId, receiverId].sort().join("_");

    console.log(`User ${senderId} sent message to room ${roomId}: ${text}`);

    io.to(roomId).emit("receiveMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
