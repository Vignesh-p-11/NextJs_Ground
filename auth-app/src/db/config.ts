import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    conn.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    
    conn.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    conn.connection.on("error", (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};