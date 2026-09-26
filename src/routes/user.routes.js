import { Router } from "express";
import { searchUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/search", searchUser);

export default router;
