import { Router } from "express";
import { createConversation } from "../controllers/conversation.controller.js";
import { verifyAccessTokenMiddleware } from "../middleware/verifyAccessToken.js";

const router = Router();

router.post("/conversation", verifyAccessTokenMiddleware, createConversation);

export default router;
