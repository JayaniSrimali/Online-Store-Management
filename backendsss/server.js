const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const stripe = require('stripe')('sk_test_51KyZL6FeoRdqg6f8CfkSdkB704x3VtsehfnbEosCyzphC6IAMvV3rYUWejnhdEOflv6aEdXTPGMzYJvv1FRMthtc00wtSqLtYz');

dotenv.config();

//import routes
const user = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const sendEmail = require('./Controllers/sendemail');

app.use(cors({
  origin: "*",
}));

//initialize Port
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use Routes
app.use("/user", user);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Endpoint to handle sending emails
app.post('/send-email', async (req, res) => {
  const { fromEmail, toEmail, subject, message } = req.body;
  const result = await sendEmail(fromEmail, toEmail, subject, message);
  res.json(result);
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, currency, amount } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Return client secret to frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

//DB connection
mongoose.connect(
  process.env.MDB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongo DB Connected Successfully");
  })
  .catch((err) => console.log("DB Connection Failed", err));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
