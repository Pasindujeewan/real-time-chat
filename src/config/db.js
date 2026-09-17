import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("MongoDb connected Succuesfull");
  } catch (error) {
    console.error("a error occur when try to connect Db", error);
    process.exit(1);
  }
};
