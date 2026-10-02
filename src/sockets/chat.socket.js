import { Conversation } from "../models/Convercation.js";
import { Message } from "../models/Message.js";

export const registerChatEvents = (io, socket) => {
  const userId = socket.user.sub;
  socket.join(`user:${userId}`);

  // Handle joining a conversation
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
  // Handle sending a message
  socket.on("sendMessage", async ({ conversationId, content }) => {
    try {
      console.log(conversationId, content);
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

      // Check if the receiver is in the conversation room
      const room = io.sockets.adapter.rooms.get(
        `conversation:${conversationId}`,
      );
      const receiverId = conversation.participants.find(
        (id) => id.toString() !== userId,
      );

      const isUserInConversation = [...(room ?? [])].some((socketId) => {
        const socket = io.sockets.sockets.get(socketId);

        return socket?.userId === receiverId;
      });

      // If the receiver is not in the conversation room, send a notification to the receiver
      if (!isUserInConversation) {
        io.to(`user:${receiverId}`).emit("conversationNotification", {
          conversationId,
          senderId: userId,
          content: message.content,
        });
        return;
      }
      // Emit the new message to all participants in the conversation room , it usually includes the sender and the receiver
      io.to(`conversation:${conversationId}`).emit("newMessage", {
        id: message._id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        message: "Failed to send message",
      });
    }
  });
};
