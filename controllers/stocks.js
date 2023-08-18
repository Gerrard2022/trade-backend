import Stock from "../models/stock.js";
import mongoose from "mongoose";

export const getOneStock = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "transaction doesn't exist -that is the id is invalid",
      });
    }

    const stock = await Stock.findById({ _id: id });

    if (!stock) {
      return res.status(404).json({ message: "Stock doesn't exist" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({}).sort({ createdAt: -1 });
    console.log(stocks);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postStocks = async (req, res) => {
const {
  stockDate,
  numberOfBags,
  location,
  description,
  factoryPrice,
  sellingPrice,
  items,
} = req.body;

// Create a new stock document
const newStock = new Stock({
  stockDate,
  numberOfBags,
  location,
  description,
  factoryPrice,
  sellingPrice,
  items,
});

// Save the new stock document to the database
newStock
  .save()
  .then((savedStock) => {
    res.status(201).json(savedStock);
  })
  .catch((error) => {
    res.status(500).json({ error: "Error creating stock entry." });
  });

};

export const deleteStocks = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "product doesn't exist -that is the id is invalid" });
    }

    const product = await Stock.findByIdAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "product doesn't exist" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStocks = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "product doesn't exist -that is the id is invalid" });
    }

    const product = await Stock.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!product) {
      return res.status(404).json({ message: "product doesn't exist" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
