import Transaction from "../models/Transaction.js";
import Stock from "../models/stock.js";
import mongoose from "mongoose";

export const getOneTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "transaction doesn't exist -that is the id is invalid",
      });
    }

    const sale = await Transaction.findById({ _id: id });

    if (!sale) {
      return res.status(404).json({ message: "Transaction doesn't exist" });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const sale = await Transaction.find({}).sort({ createdAt: -1 });
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postTransactions = async (req, res) => {
  const {
    id,
    customer,
    balance,
    topay,
    paid,
    method,
    orderedBags,
    shippedBags,
  } = req.body;
  const newProductsInfo = [];
  var transactionProducts = [];
  // console.log(products);
  const stocks = await Stock.find({});
  let totalAmount = 0;
  var foundItem;
  console.log("Item id", id);
  try {
    for (var stock of stocks) {
      foundItem = stock.items.find((item) => item._id === id);
      console.log("The item found", foundItem);

      if (!foundItem) {
        var error = new Error(`Product selected with id does not exist!`);
        error.status = 403;
        throw error; // Throw the error object directly
      } else {
        //totalAmount = productFound.price * product.unitsTaken;
        if (foundItem.unitsOnHand == 0) {
          error = new Error("There is no product supply left in the stock");
          error.status = 403;
          throw new Error(error);
        }
        if (foundItem.unitsOnHand < orderedBags) {
          error = new Error(
            "The units wanted are more than what is in stock, reduce the units"
          );
          error.status = 403;
          throw new Error(error);
        } else {
          foundItem.unitsOnHand -= orderedBags;
        }
        // productFound.save();
        // transactionProducts.push({
        //   ...productFound,
        //   id: productFound._id,
        // });
        // newProductsInfo.push(productFound);
      }
    }

    // const sale = await Transaction.create({
    //   ...req.body,
    //   products: transactionProducts,
    //   totalAmount,
    // });
    // res.status(201).json({ transaction: sale, newProductsInfo });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
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
