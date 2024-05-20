// controllers/cartController.js

const Cart = require('../model/Cart');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


exports.addToCart = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ productId, userId, quantity });
      await cartItem.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.updateCartItem = async (req, res) => {
    const { cartItemId, quantity } = req.body;
  
    try {
      const cartItem = await Cart.findById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  exports.deleteCartItem = async (req, res) => {
    const { productId } = req.body;

    try {
        const cartItem = await Cart.findOneAndDelete({ productId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.makePayment = async (req, res) => {
  try {
    // Assuming stripe is properly initialized
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: 'Product 1',
            },
            unit_amount: 1000, 
          },
          quantity: 2,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: 'Product 2',
            },
            unit_amount: 1500, 
          },
          quantity: 1,
        }
      ],
      success_url: "http://localhost:3000/Profile", // Replace with your actual success URL
      cancel_url: "http://example.com/cancel", // Replace with your actual cancel URL
    });

    // Log success message without sending a response
    console.log("Payment session created successfully");

    // Send the Stripe session URL back to the client
    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating payment session:", e.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

