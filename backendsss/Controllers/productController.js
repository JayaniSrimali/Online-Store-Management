
const Product = require("../model/ProductModel");

// Insert a new product (admin only)
const insertProduct = async (req, res) => {
    try {
        const { name, type, category, price, imageUrl } = req.body;
        const product = new Product({ name, type, category, price, imageUrl });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Update a product (admin only)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, category, price, imageUrl } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, type, category, price, imageUrl }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete a product (admin only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Display all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { insertProduct, updateProduct, deleteProduct, getAllProducts };
