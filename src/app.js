import "./config/env.js";
import express from "express";
import errorMiddleware from "./middleware/error.middlware";

const app = express();

app.use(express.json());

app.use(errorMiddleware);

export default app;
