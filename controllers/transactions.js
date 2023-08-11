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
  
    const{ unit, products } = req.body
  
    try {
  
      const product = await Product.findOne({ _id: products.productId });
      if(product){
        const sale = await Transaction.create({ 
          unit, 
          product: [{
            productId: product._id,
            name: product.name,
            price: product.price,
            supply: product.supply,
          }]})
        res.status(200).json(sale)
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const deleteTransactions = async (req, res) => {
    try {
  
      const { id } = req.params
  
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "transaction doesn't exist -that is the id is invalid" })
      }
  
      const sale = await Transaction.findByIdAndDelete({_id: id})
  
      if(!sale){
        return res.status(404).json({ message: "Transaction doesn't exist" })
      }
      res.status(200).json(sale)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  
  };
  
  export const updateTransactions = async (req, res) => {
    try {
      const { id } = req.params
  
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "Transaction doesn't exist -that is the id is invalid" })
      }
  
      const sale = await Transaction.findOneAndUpdate({_id: id},{ ...req.body })
  
      if(!sale){
        return res.status(404).json({ message: "Transaction doesn't exist" })
      }
      res.status(200).json(sale)
  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  