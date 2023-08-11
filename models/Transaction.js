import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    unit: Number,
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference the 'Product' model
          required: true,
        },
        name: String,
        price: Number,
        supply: Number,
      },
    ],
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;