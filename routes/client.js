import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  postCustomer,
  deleteCustomer,
  updateCustomer,
  postProducts,
  deleteProducts,
  updateProducts,
} from "../controllers/client.js";

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