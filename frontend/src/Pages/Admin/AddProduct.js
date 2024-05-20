import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../imgaes/log.png";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    price: 0,
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://localhost:5000/products", formData, config);
      Swal.fire("Congrats", "New Product Added successfully", "success");
      navigate("/dashborad");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#D5D5CE" }}>
      <br />
      <div
        className="container-fluid px-1 px-md-7 px-lg-1 px-xl-5 py-10 mx-auto "
        style={{ backgroundColor: "#D5D5CE" }}
      >
        <div
          className="card card0 border-0"
          style={{ backgroundColor: "#D5D5CE" }}
        >
          <br></br>
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img
                    src={logo}
                    style={{ height: "240%", width: "240%", marginTop: "5%" }}
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h1 style={{ color: "black" }}>Add New Product item </h1>
              <div className="col-lg-6" style={{ backgroundColor: "#D5D5CE" }}>
                <form onSubmit={handleSubmit} encType="">
                  <div className="grid grid-cols-2 grid-rows-5 gap-4">
                    <div>
                      {" "}
                      <label
                        htmlFor="name"
                        style={{ color: "", fontSize: "20px" }}
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        style={{ width: "190%" }}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      {" "}
                      <label
                        htmlFor="type"
                        style={{ color: "", fontSize: "20px" }}
                      >
                        Product Type
                      </label>
                      <input
                        className="form-control"
                        id="price"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{ width: "190%" }}
                        type="text"
                        placeholder="Product Type"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        style={{ color: "", fontSize: "20px" }}
                      >
                        Product Price
                      </label>
                      <input
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={{ width: "190%" }}
                        type="number"
                        placeholder="Product Price"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        style={{ color: "", fontSize: "20px" }}
                      >
                        Product Category
                      </label>
                      <br></br>
                      <select
                        className="form-control"
                        style={{ width: "190%" }}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        <option value="carbonatedtea">Carbonated Tea</option>
                        <option value="instant_black_tea">Instant Black Tea</option>
                        <option value="instant_milk_Tea">Instant Milk Tea</option>
                        <option value="tea_protein">Tea Protein</option>
                        <option value="tea_sauce">Tea Sauce</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="imageUrl"
                        style={{ color: "", fontSize: "20px" }}
                      >
                        Image Link
                      </label>
                      <textarea
                        className="form-control"
                        id="imageUrl"
                        style={{ width: "190%" }}
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image Link"
                        rows="6"
                      ></textarea>
                    </div>

                    <div className="col-span-2">
                      <br></br>
                      <button
                        type="submit"
                        style={{ fontSize: "15px" }}
                        className="btn btn-success"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <br></br>

                  {/* <Link to="/"><button type="button" style={{fontSize:"10px"}} className="btn btn-success">Back to Home</button></Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
