import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AddToCartButton from "./AddToCartButton";

const ProductList = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="App">
      <h1>Product List</h1>
     
      <br />
      <br />
      <Carousel showDots={true} responsive={responsive}>
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <center>
            <img
              className="product--image"
              src={product.imageUrl}
              alt="product image"
              style={{ width: "300px", height: "200px"  }}
            />
            </center>
            <h2>{product.name}</h2>
            <p className="price">{product.price}</p>
            <p>{product.description}</p>
            <p>
              <AddToCartButton productId={product._id} userId={userId} />
            </p>
            <br />
          </div>
        ))}
      </Carousel>
      <br />
      <br />
    </div>
  );
};

export default ProductList;
