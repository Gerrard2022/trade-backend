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
  const transactionDataArray = req.body; // Assuming the request body is an array of objects
  const newProductsInfo = [];
  const transactionProducts = [];
  const stocks = await Stock.find({});

  try {
    for (const transactionData of transactionDataArray) {
      const {
        id,
        itemNumber,
        customer,
        balance,
        topay,
        paid,
        method,
        orderedBags,
        shippedBags,
      } = transactionData;

      let ID = id.toString();
      var foundStock;
      let totalAmount = 0;
      let foundItem = null; // Initialize the variable to store the found item

      for (const stock of stocks) {
        for (const item of stock.items) {
          console.log("item id", item._id, "ID: ", ID);
          if (item._id == ID) {
            foundItem = item; // Assign the found item
            foundStock = stock; // Assign the found stock
            break; // Exit the loop since the item is found
          }
        }

        if (foundItem) {
          break; // Exit the outer loop since the item is found
        }
      }

      if (foundItem) {
        if (foundItem.unitsOnHand == 0) {
          const error = new Error(
            "There is no product supply left in the stock"
          );
          error.status = 403;
          throw error;
        }
        if (foundItem.unitsOnHand < orderedBags) {
          const error = new Error(
            "The units wanted are more than what is in stock, reduce the units"
          );
          error.status = 403;
          throw error;
        } else {
          console.log(
            "Item found:",
            foundItem.unitsOnHand,
            "units on hand",
            orderedBags
          );
          var leftBags;
          var bag;
          foundItem.unitsOnHand -= orderedBags;
          leftBags = foundItem.unitsOnHand;
          bag = foundItem.pairOrBag;

          // Save the updated stock entry back to the database
          await Stock.findByIdAndUpdate(
            { _id: foundStock._id },
            { items: foundStock.items }, // Assuming 'items' is the array of items within your Stock model
            { new: true }
          );

          const newTransaction = new Transaction({
            itemNumber,
            orderedBags,
            shippedBags,
            leftBags,
            bag,
            balance,
            paid,
            topay,
            method,
            customer,
          });

          const savedTransaction = await newTransaction.save();

          transactionProducts.push({
            ...savedTransaction.toObject(),
            id: savedTransaction._id,
          });
          newProductsInfo.push(savedTransaction);
        }
      } else {
        console.log("Item not found");
        const error = new Error(`Product selected with id does not exist!`);
        error.status = 403;
        throw error;
      }
    }

    // After processing all transaction objects, send the response with the array of created transactions
    res.status(201).json(transactionProducts);
    console.log("hiii", transactionProducts);
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
