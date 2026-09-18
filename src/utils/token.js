import jwt from "jsonwebtoken";
import { env } from "../config/env";

// generate access token and refresh token
export const generateToken = (userId) => {
  return jwt.sign(
    {
      sub: userId,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRE,
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    },
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRE,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
};
