import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Customer from "../models/Customer.js";
import Transaction from "../models/Transaction.js"; 
import mongoose from "mongoose";

// customer backend code

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const postCustomer = async (req, res) => {

  const{ name, email, country, phoneNumber } = req.body

  try {

    const customer = await Customer.create({ name, email, country, phoneNumber })
    res.status(200).json(customer)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const deleteCustomer = async (req, res) => {
  try {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ message: "customer doesn't exist -that is the id is invalid" })
    }

    const customer = await Customer.findByIdAndDelete({_id: id})

    if(!customer){
      return res.status(404).json({ message: "customer doesn't exist" })
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ message: "customer doesn't exist -that is the id is invalid" })
    }

    const customer = await Customer.findOneAndUpdate({_id: id},{ ...req.body })

    if(!customer){
      return res.status(404).json({ message: "customer doesn't exist" })
    }
    res.status(200).json(customer)

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// products code

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


// sales or transactions backend end code
export const getTransactions = async (req, res) => {
  try {
    const sale = await Transaction.find({}).sort({ createdAt: -1 });
    res.status(200).json(sale);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postTransactions = async (req, res) => {

  const{ unit } = req.body

  try {

    const sale = await Transaction.create({ unit })
    res.status(200).json(sale)
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

export const updateTransations = async (req, res) => {
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
