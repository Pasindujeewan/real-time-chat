import "dotenv/config";
import { z } from "zod";

// validate all env variables and set default values
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),

  MONGO_URI: z.string().min(1, "MONGO_URI is required"),

  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
  ACCESS_TOKEN_EXPIRE: z.string().default("30m"),

  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  REFRESH_TOKEN_EXPIRE: z.string().default("30d"),

  JWT_ISSUER: z.string().default("chat-api"),
  JWT_AUDIENCE: z.string().default("chat-client"),
});

export const env = envSchema.parse(process.env);
