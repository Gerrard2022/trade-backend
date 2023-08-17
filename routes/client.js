import express from "express";
import { getCustomers, postCustomer,deleteCustomer,updateCustomer,} from "../controllers/customer.js";
import { postStocks, deleteStocks, updateStocks,  getStocks } from '../controllers/stocks.js';
import {  getOneTransactions,getTransactions, postTransactions, deleteTransactions, updateTransactions } from '../controllers/transactions.js'

const router = express.Router();


// customer
router.get("/customers", getCustomers);
router.post('/customers', postCustomer);
router.delete('/customers/:id', deleteCustomer);
router.patch('/customers/:id', updateCustomer);

// stocks
router.get("/stocks", getStocks);
router.post("/stocks", postStocks);
router.delete("/stocks/:id", deleteStocks);
router.patch("/stocks/:id", updateStocks);

// sales or transactions
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getOneTransactions);
router.post("/transactions", postTransactions);
router.delete("/transactions/:id", deleteTransactions);
router.patch("/transactions/:id", updateTransactions);

export default router;