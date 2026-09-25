export const registerChatEvents = (io, socket) => {
  const userId = socket.user.sub;

  socket.join(`user:${userId}`);

  socket.on("sendMessage", async (data) => {
    console.log(data);
    const { receiverId, content } = data;
    io.to(`user:${receiverId}`).emit("newMessage", {
      senderId: userId,
      content,
    });
  });
};
