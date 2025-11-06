import express from "express";
import userAuth from "../middlewares/userAuth.js";
import Account from "../models/account.js"

const accountRouter = express.Router();

accountRouter.get("/", userAuth, async (req, res) => {
  const { accountName } = req.body;
  const user = req.user;

  try {
    const account = await Account.findOne({
      userId: user._id,
      accountName
    });

    res.json(account);
  } catch (err) {
    console.error(err.message);
  }
});

accountRouter.post("/", userAuth, async (req, res) => {
  const { accountName, defaultType, category } = req.body;
  const user = req.user;

  try {
    const account = new Account({
      userId: user.id,
      accountName,
      defaultType,
      category
    });

    const savedAccount = await account.save();

    res.json({
      message: "Account created successfully",
      data: savedAccount
    });
  } catch (err) {
    console.error(err.message);
    console.log(`Unable to create account ${accountName}`);
  };
});

accountRouter.patch("/", (req, res) => {
  res.send("TO DO: Update an existing account");
});

accountRouter.delete("/", (req, res) => {
  res.send("TO DO: Delete an existing account");
});

export default accountRouter;