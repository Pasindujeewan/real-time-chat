import { createClient } from "redis";
import { env } from "./env.js";

const redis = createClient({
  url: env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
      console.log("Redis connected successfully");
    }
  } catch (err) {
    console.error("Redis connection error:", err);
    throw err;
  }
};

export default redis;
