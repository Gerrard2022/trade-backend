import Customer from "../models/Customer.js";
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
