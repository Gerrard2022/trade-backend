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
    itemNumber,
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
  var foundStock;

  const ID = id.toString();
 
  try {

      let foundItem = null; // Initialize the variable to store the found item

      for (const stock of stocks) {
        for (const item of stock.items) {
          console.log("item id", item._id, "ID: ", ID);
          if (item._id == ID) {
            foundItem = item; // Assign the found item
            foundStock = stock; //assign the found stock
            break; // Exit the loop since the item is found
          }
        }

        if (foundItem) {
          break; // Exit the outer loop since the item is found
        }
      }

      if (foundItem) {

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
            Stock.findByIdAndUpdate(
              {_id: foundStock._id},
              { items: foundItem },
              { new: true },
            ).then(() => console.log("worked !!"))
            .catch(err => console.log(("failed,", err)))
          }

        foundItem = new Transaction({
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

        foundItem.save().then((newItem) => {
          res.status(201).json(newItem);
        });
        transactionProducts.push({
          ...foundItem,
          id: foundItem._id,
        });
        newProductsInfo.push(foundItem);
      } else {
        console.log("Item not found");
        var error = new Error(
          `Product selected with id does not exist!`
        );
        error.status = 403;
        throw error;
      }

     
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
