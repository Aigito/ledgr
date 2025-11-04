import jwt from "jsonwebtoken";
import User from "../models/user.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("You are logged out, please log in again");
    }

    const decodedObj = jwt.verify(token, process.env.SECRET_KEY);

    const { userId } = decodedObj;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User does not exist!");
    };

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export default userAuth;