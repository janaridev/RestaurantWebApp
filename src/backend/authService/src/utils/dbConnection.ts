import mongoose from "mongoose";

export async function connectToMongoDB() {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000,
  };
  const uri = process.env.MONGO_URL;

  try {
    await mongoose.connect(uri, mongooseOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
