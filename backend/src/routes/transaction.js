import express from "express";
import userAuth from "../middlewares/userAuth.js";
import Transaction from "../models/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/", userAuth, async (req, res) => {
  const user = req.user;

  const { description, entries } = req.body;

  try {
    const transaction = new Transaction({
      userId: user.id,
      description,
      entries
    });

    const savedTransaction = await transaction.save();

    res.send({
      message: "Transaction successfully saved!",
      data: savedTransaction
    });
  } catch (err) {
    res.status(400).send(err.message)
  }
});

transactionRouter.get("/", userAuth, async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate("entries.accountId", "accountName");

    res.send(transaction);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default transactionRouter;