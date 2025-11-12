import mongoose from "mongoose";

const minTwoAccounts = (acc) => {
  return Array.isArray(acc) && acc.length >= 2;
};

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction must be linked to a user"]
    },
    description: {
      type: String,
    },
    entries: {
      type: [
        {
          accountId: {
            type: mongoose.Types.ObjectId,
            ref: "Account",
            required: [true, "Account must be selected"],
          },
          type: {
            type: String,
            enum: {
              values: ["debit", "credit"],
              message: "`{VALUE}` is not a valid type, please choose debit or credit"
            },
            required: [true, "Please provide a type: debit or credit"]
          },
          amount: {
            type: Number,
            required: [true, "Please enter amount"]
          }
        }
      ],
      validate: {
        validator: minTwoAccounts,
        message: "Must be connected to at least 2 accounts"
      }
    },
  },
  {
    timestamps: true
  }
);

transactionSchema.pre('save', function (next) {
  const totalDebit = this.entries
    .filter(e => e.type === 'debit')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalCredit = this.entries
    .filter(e => e.type === 'credit')
    .reduce((sum, e) => sum + e.amount, 0);

  if (totalDebit !== totalCredit) {
    return next(new Error('Total debit must equal total credit.'));
  }

  next();
});

const Transaction = mongoose.model("Trasaction", transactionSchema);

export default Transaction;