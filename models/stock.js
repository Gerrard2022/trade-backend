import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemNumber: String,
  size: String,
  location: String,
  pairOrBag: Number,
  factoryPrice: Number,
  sellingPrice: Number,
  reorderLevel: Number,
  unitsOnHand: Number,
});

const stockSchema = new mongoose.Schema({
  stockDate: Date,
  numberOfBags: Number,
  location: String,
  description: String,
  isStockIn: Boolean,
  factoryPrice: Number,
  sellingPrice: Number,
  items: [itemSchema], // Embedded items in the stock
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
