import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
  try {
    const sale = await Transaction.find({}).sort({ createdAt: -1 });
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postTransactions = async (req, res) => {
  const { products } = req.body;
  let totalAmount;
  let product;
  try {
    for (product in products) {
      let productFound = await Product.findById(product.id);
      if (!productFound) {
        const error = new Error(
          `Product selected with id ${product.id} does not exist!`
        );
        error.status = 401;
        throw new Error(error);
      }else{
        totalAmount += productFound.price;
        productFound.supply -= product.unitsTaken;
        productFound.save();
      }
    }

    const sale = await Transaction.create({
      products,
      totalAmount
    });
    res.status(201).json(sale);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "transaction doesn't exist -that is the id is invalid",
      });
    }

    const sale = await Transaction.findByIdAndDelete({ _id: id });

    if (!sale) {
      return res.status(404).json({ message: "Transaction doesn't exist" });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Transaction doesn't exist -that is the id is invalid",
      });
    }

    const sale = await Transaction.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!sale) {
      return res.status(404).json({ message: "Transaction doesn't exist" });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
