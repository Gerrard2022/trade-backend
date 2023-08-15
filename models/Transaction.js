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
        price: String,
        supply: String,        
      },
    ],
    totalAmount: String,
    orderedBags : String,
    shippedBags: String,
    leftBags : String,
    bag : String,
    customer : String,
    
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;