import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const AddToCartButton = ({ productId }) => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const addToCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/cart/add-to-cart", {
        productId,
        userId,
        quantity: 1 // Assuming quantity is always 1 for this example
      });
      setMessage(response.data.message);
      Swal.fire("Add to cart success!", "Item added to cart successfully", "success");


    } catch (error) {
      setMessage("Error adding item to cart");
    }
  };

  return (
    <div>
      <button onClick={addToCart}>Add to Cart</button>
      <p>{message}</p>
    </div>
  );
};

export default AddToCartButton;
