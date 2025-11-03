import express from "express";
import accountRouter from "./routes/account.js";

const app = express();

app.use("/account", accountRouter);

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});