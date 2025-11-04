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
    const cookie = await savedUser.signJWT();

    res.cookie("token", cookie, { expires: new Date(Date.now() + (60 * 24 * 7 * 60000)) });

    res.json({
      message: "User successfully created",
      data: savedUser
    });
  } catch (err) {
    console.error(err.message);
    console.log(`Unable to create new user ${name, email}`);
  };
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const cookie = await savedUser.signJWT();
      res.cookie("token", cookie, { expires: new Date(Date.now() + (60 * 24 * 7 * 60000)) });

      res.send("Successfully logged in");
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (err) {
    console.error(err.message);
  }
});

export default userRouter;