import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    itemNumber: String,
    orderedBags : String,
    shippedBags: String,
    leftBags : String,
    bag : String,
    balance: String,
    paid: String,
    topay: String,
    method: String,
    customer : String,
    
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;