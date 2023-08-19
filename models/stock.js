import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemNumber: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pairOrBag: {
    type: Number,
    required: true,
  },
  itemFactoryPrice: {
    type: Number,
    required: true,
  },
  itemSellingPrice: {
    type: Number,
    required: true,
  },
  itemReorderLevel: {
    type: Number,
    required: true,
  },
  unitsOnHand: {
    type: Number,
    required: true,
  },
});

const stockSchema = new mongoose.Schema({
  stockDate: {
    type: String,
    required: true
  },
  numberOfBags: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  factoryPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  items: [itemSchema], // Embedded items in the stock
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
