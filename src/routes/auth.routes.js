import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import { verifyAccessTokenMiddleware } from "../middleware/verifyAccessToken.js";
import { verifyRefreshTokenMiddleware } from "../middleware/verifyRefreshToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", verifyRefreshTokenMiddleware, refreshToken);
router.get("/me", verifyAccessTokenMiddleware, getMe);
router.post("/logout", logout);

export default router;
