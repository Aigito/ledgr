import express from "express";
import userAuth from "../middlewares/userAuth.js";
import Account from "../models/account.js"

const accountRouter = express.Router();

accountRouter.get("/", userAuth, async (req, res) => {
  const { accountName } = req.body;
  const user = req.user;
  const filter = { userId: user.id, accountName };

  try {
    const account = await Account.findOne(filter);

    if (!account) res.status(404).send(`Account '${accountName}' does not exist!`);

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

    res.send({
      message: `Account '${savedAccount}' created successfully`,
      data: savedAccount
    });
  } catch (err) {
    console.error(err.message);
    console.log(`Unable to create account '${accountName}'`);
  };
});

accountRouter.patch("/", userAuth, async (req, res) => {
  const { oldAccountName, newAccountName } = req.body;
  const user = req.user;
  const filter = { userId: user.id, accountName: oldAccountName };

  try {
    const updatedAccount = await Account.findOneAndUpdate(
      filter,
      { accountName: newAccountName },
      { returnDocument: "after" }
    );

    if (!updatedAccount) {
      res.status(404).send(`Account '${oldAccountName}' does not exist!`);
    } else {
      res.send({
        message: "Account successfully updated",
        data: updatedAccount
      });
    };
  } catch (err) {
    console.error(err.message);
  };
});

accountRouter.delete("/", userAuth, async (req, res) => {
  const { accountName } = req.body;
  const user = req.user;
  const filter = { userId: user.id, accountName };

  const deletedAccount = await Account.findOneAndDelete(filter);

  if (!deletedAccount) {
    res.status(404).send(`Account '${accountName}' does not exist!`);
  } else {
    res.send({
      message: `Account '${accountName}' successfully deleted`,
      data: deletedAccount
    });
  }
});

export default accountRouter;