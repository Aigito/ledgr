import express from "express";
import userAuth from "../middlewares/userAuth.js";

const accountRouter = express.Router();

accountRouter.get("/", userAuth, (req, res) => {
  res.send("TO DO: Retrieve all accounts");
});

accountRouter.post("/", (req, res) => {
  res.send("TO DO: Create a new account");
});

accountRouter.patch("/", (req, res) => {
  res.send("TO DO: Update an existing account");
});

accountRouter.delete("/", (req, res) => {
  res.send("TO DO: Delete an existing account");
});

export default accountRouter;