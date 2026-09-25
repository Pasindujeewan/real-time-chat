import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// generate access token and refresh token
export const generateAccessToken = (userId) => {
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

// verify access token
export const verifiyAccesstoken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
};

//verify refresh token
export const verifyRefreshToken = () => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
};
