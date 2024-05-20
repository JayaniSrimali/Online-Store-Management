
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Checkout = ({ items, name, email }) => {
    const location = useLocation();
    const totalPrice = new URLSearchParams(location.search).get('totalPrice');

  return (
    <Elements stripe={stripePromise}>
           <p>Total Price:${totalPrice}</p>
      <CheckoutForm items={items}  />
    </Elements>
  );
};

export default Checkout;
