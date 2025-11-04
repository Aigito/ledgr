import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const user = new User({
      name,
      email,
      password: passwordHash
    });

    const savedUser = await user.save();
    res.json({
      message: "User successfully created",
      data: savedUser
    });
  } catch (err) {
    console.error(err.message);
    console.log(`Unable to create new user ${name, email}`)
  };
});

export default userRouter;