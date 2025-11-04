import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: [3, "User name is too short, needs to be more than 3 characters"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "Please only use alphabetical characters in user name"
      }
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      minlength: [3, "User email is too short"],
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("User email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message: "Please ensure that password contains 1 lowercase, 1 uppercase, 1 number, 1 symbol and at least 8 characters"
      }
    },
  },
  {
    timestamps: true
  }
);

userSchema.methods.signJWT = async function () {
  const user = this;

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 3 });

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;