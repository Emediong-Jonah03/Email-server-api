import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.config";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI!, {
      dbName: "email-db", 
    });
    console.log(`Connected to MongoDB at ${NODE_ENV} environment`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
