import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference the 'Product' model
          required: true,
        },
        name: String,
        price: Number,
        supply: Number,        
      },
    ],
    totalAmount: Number,
    orderedBags : Number,
    shippedBags: Number,
    leftBags : Number,
    bag : Number,
    customer : String,
    
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;