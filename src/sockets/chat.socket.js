import { Conversation } from "../models/Convercation.js";
import { Message } from "../models/Message.js";

export const registerChatEvents = (io, socket) => {
  const userId = socket.user.sub;

  socket.on("joinConversation", async ({ conversationId }) => {
    try {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: userId,
      });

      if (!conversation) {
        socket.emit("error", {
          message: "Conversation not found",
        });

        return;
      }

      socket.join(`conversation:${conversationId}`);

      socket.emit("conversationJoined", {
        conversationId,
      });
    } catch (error) {
      socket.emit("error", {
        message: "Failed to join conversation",
      });
    }
  });

  socket.on("sendMessage", async ({ conversationId, content }) => {
    try {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: userId,
      });

      if (!conversation) {
        socket.emit("error", {
          message: "You are not part of this conversation",
        });

        return;
      }

      const message = await Message.create({
        conversationId,
        senderId: userId,
        content,
      });

      io.to(`conversation:${conversationId}`).emit("newMessage", {
        id: message._id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
      });
    } catch (error) {
      socket.emit("error", {
        message: "Failed to send message",
      });
    }
  });
};
