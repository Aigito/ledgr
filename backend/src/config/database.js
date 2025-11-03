import mongoose from "mongoose";
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose.connection.on('connected', () => console.log('Connected to Mongo'));

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;