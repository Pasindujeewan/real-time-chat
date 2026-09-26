import "./config/env.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middlware.js";
import chatRoutes from "./routes/chat.router.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

// Mount auth routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/user", userRoutes);

// Centralized error handling middleware
app.use(errorMiddleware);

export default app;
