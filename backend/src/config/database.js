import mongoose from "mongoose";
import "dotenv/config";

mongoose.connection.on('connected', () => console.log('Connected to Mongo'));

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;