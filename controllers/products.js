import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 });
      res.status(200).json(products);
  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const postProducts = async (req, res) => {
  
    const{ name, price, category, supply } = req.body
  
    try {
  
      const product = await Product.create({ name, price, category, supply })
      res.status(200).json(product)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const deleteProducts = async (req, res) => {
    try {
  
      const { id } = req.params
  
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "product doesn't exist -that is the id is invalid" })
      }
  
      const product = await Product.findByIdAndDelete({_id: id})
  
      if(!product){
        return res.status(404).json({ message: "product doesn't exist" })
      }
      res.status(200).json(product)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  
  };
  
  export const updateProducts = async (req, res) => {
    try {
      const { id } = req.params
  
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "product doesn't exist -that is the id is invalid" })
      }
  
      const product = await Product.findOneAndUpdate({_id: id},{ ...req.body })
  
      if(!product){
        return res.status(404).json({ message: "product doesn't exist" })
      }
      res.status(200).json(product)
  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }