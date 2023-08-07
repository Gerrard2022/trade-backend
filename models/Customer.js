import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    country: String,
    phoneNumber: String,
    transactions: Array,

  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", CustomerSchema);
export default Customer;