import express from "express";
import userAuth from "../middlewares/userAuth.js";
import Transaction from "../models/transaction.js";
import validateEntries from "../middlewares/validateEntries.js";

const transactionRouter = express.Router();

transactionRouter.get("/", userAuth, async (req, res) => {
  const { _id } = req.body;

  try {
    let transaction;

    if (_id) {
      transaction = await Transaction
        .findById(_id)
        .populate("entries.accountId", "accountName");
    } else {
      transaction = await Transaction.find();
    }

    res.send(transaction);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

transactionRouter.post("/", userAuth, validateEntries, async (req, res) => {
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

transactionRouter.patch("/", userAuth, validateEntries, async (req, res) => {
  const { _id, description, entries } = req.body;

  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id },
      {
        description,
        entries
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.send({
      message: "Transaction has been successfully updated!",
      data: updatedTransaction
    });
  } catch (err) {
    res.status(400).send(err.message)
  }
});

export default transactionRouter;