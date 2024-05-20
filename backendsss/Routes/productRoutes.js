// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const { insertProduct, updateProduct, deleteProduct, getAllProducts } = require("../Controllers/productController");
const auth = require("../Middleware/auth");

// Insert a new product (admin only)
router.post("/", auth, insertProduct);

// Update a product (admin only)
router.patch("/:id", auth, updateProduct);

// Delete a product (admin only)
router.delete("/:id", auth, deleteProduct);

// Display all products
router.get("/", getAllProducts);

module.exports = router;
