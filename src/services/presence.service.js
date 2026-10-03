import redis from "../config/redis";
import User from "../models/user.model.js";

const getSocketKey = (userId) => `user:${userId}:socket`;

// add a new socket connection for a user
export const addUserConnection = async (userId, socketId) => {
  const key = getSocketKey(userId);

  const previousCount = await redis.sCard(key);
  await redis.sAdd(key, socketId);

  return previousCount === 0; // Return true if this is the first connection for the user
};

// remove a socket connection for a user
export const removeUserConnection = async (userId, socketId) => {
  const key = getSocketKey(userId);

  await redis.sRem(key, socketId);

  const remaining = await redis.sCard(key);

  return remaining === 0;
};

// check if a user is online
export const isUserOnline = async (userId) => {
  const count = await redis.sCard(getSocketKey(userId));

  return count > 0; // Return true if the user has any active socket connections
};

// set the user last seen timestamp when they go offline
export const setUserOffline = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    lastSeen: new Date(),
  });
};
