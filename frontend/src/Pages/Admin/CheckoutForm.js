import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/user/getUserProfile/${localStorage.getItem("userId")}`,
          config
        );
        setFullName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
        // Handle error as per your requirement
      }
    };

    fetchUserProfile();
  }, []);

  const calculateTotalAmount = (items) => {
    if (!items || items.length === 0) {
      return 0; // Return 0 if items is undefined or empty
    }
  
    // Calculate total amount by summing up the prices of all items
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    // Calculate total amount based on items (you need to implement this logic)
    const totalAmount = calculateTotalAmount(items);
  
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:5000/cart/payment', {
        items,
        amount: totalAmount,
        email,
      });

      // Assuming your backend returns a client secret for the payment intent
      const { clientSecret } = response.data;
  
      // Confirm the payment intent with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
          },
        },
      });
  
      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment successful');
          // Optionally, you can redirect or perform any other action here after successful payment
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert("Payment successful");  
      window.location.href = "/profile";
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="card">Card Details:</label>
          <CardElement id="card" />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="button-container">
          <button className="btn btn-success" type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
