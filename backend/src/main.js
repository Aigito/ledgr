import express from "express";
import accountRouter from "./routes/account.js";
import connectDB from "./config/database.js";

const app = express();

app.use("/account", accountRouter);

connectDB()
  .then(() => {
    app.listen(3000, console.log("Listening on port 3000"));
  })
  .catch(err => console.error("Failed to connect: ", err.message));