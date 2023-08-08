import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    unit: Number,
    product: {
      type: [mongoose.Types.ObjectId],
      ref: 'Product'
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;