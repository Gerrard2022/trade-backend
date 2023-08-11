import express from "express";
import { getCustomers, postCustomer,deleteCustomer,updateCustomer,} from "../controllers/customer.js";
import { postProducts, deleteProducts, updateProducts,  getProducts } from '../controllers/products.js';
import {   getTransactions, postTransactions, deleteTransactions, updateTransactions } from '../controllers/transactions.js'

const router = express.Router();


// customer
router.get("/customers", getCustomers);
router.post('/customers', postCustomer);
router.delete('/customers/:id', deleteCustomer);
router.patch('/customers/:id', updateCustomer);

// product
router.get("/products", getProducts);
router.post('/products', postProducts);
router.delete('/products/:id', deleteProducts);
router.patch('/products/:id', updateProducts);

// sales or transactions
router.get("/transactions", getTransactions);
router.post("/transactions", postTransactions);
router.delete("/transactions/:id", deleteTransactions);
router.patch("/transactions/:id", updateTransactions);

export default router;