import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "@utils";
import { MONGO_URI } from "@constants";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected...");
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
