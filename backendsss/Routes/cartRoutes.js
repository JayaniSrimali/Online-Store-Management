// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const auth = require('../Middleware/auth');


router.post('/add-to-cart', cartController.addToCart);
router.get('/get-cart-items', cartController.getCartItems);
router.put('/update-cart-item', cartController.updateCartItem);
router.delete('/delete-cart-item', cartController.deleteCartItem);
router.post('/payment', cartController.makePayment);


module.exports = router;
