import express from "express";
import accountRouter from "./routes/account.js";
import connectDB from "./config/database.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use("/account", accountRouter);
app.use("/user", userRouter);

connectDB()
  .then(() => {
    app.listen(3000, console.log("Listening on port 3000"));
  })
  .catch(err => console.error("Failed to connect: ", err.message));