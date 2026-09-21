import "./config/env.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middlware.js";

const app = express();

app.use(express.json());

// Mount auth routes
app.use("/api/v1/auth", authRoutes);

// Centralized error handling middleware
app.use(errorMiddleware);

export default app;
