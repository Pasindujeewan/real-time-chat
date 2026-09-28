import { Router } from "express";
import {
  createConversation,
  getMessages,
} from "../controllers/conversation.controller.js";
import { verifyAccessTokenMiddleware } from "../middleware/verifyAccessToken.js";

const router = Router();

router.post("/conversation", verifyAccessTokenMiddleware, createConversation);
router.get("/getMessage", verifyAccessTokenMiddleware, getMessages);

export default router;
