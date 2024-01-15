import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DataBase ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export { connectdb };
