import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Account must be linked to a user"]
    },
    accountName: {
      type: String,
      required: [true, "Please provide an account name"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[\w ]+$/.test(value);
        },
        message: "Please only use alphanumeric characters"
      }
    },
    defaultType: {
      type: String,
      enum: {
        values: ["debit", "credit"],
        message: "`{VALUE}` is not a valid type, please choose debit or credit"
      },
      required: [true, "Please provide a default type: debit or credit"]
    },
    category: {
      type: String,
      enum: {
        values: ["income", "expense"],
        message: "`{VALUE} is not a valid category"
      },
      required: [true, "Please select a valid category"]
    }
  },
  {
    timestamps: true
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;