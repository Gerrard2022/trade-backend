import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  postCustomer,
  deleteCustomer,
  updateCustomer
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/transactions", getTransactions);

// customer
router.get("/customers", getCustomers);
router.post('/customers', postCustomer);
router.delete('/customers/:id', deleteCustomer);
router.patch('/customers/:id', updateCustomer);

export default router;