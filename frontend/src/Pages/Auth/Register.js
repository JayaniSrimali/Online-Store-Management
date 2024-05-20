import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Login from "../imgaes/Teacup.png";

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    userRole: "",
    password: "",
    lname: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, name, userRole, password, lname } = data;

    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        email,
        name,
        userRole,
        password,
        lname,
      });

      if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registration Failed..!",
        });
      } else {
        setData({
          email: "",
          name: "",
          userRole: "",
          password: "",
          lname: "",
        });
        Swal.fire(
          "Registration Successful!",
          "Login here for your Profile!",
          "success"
        );

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <br></br> <br></br> <br></br>
      <div className="square border border-success border-4 ">
        <form onSubmit={registerUser}>
          <br></br>
          <h3 style={{ alignContent: "center", marginLeft: "45%" }}>
            Sign Up{" "}
          </h3>
          <br></br>
          <div className="container" style={{ alignContent: "center" }}>
            <img
              src={Login}
              alt=""
              width="25%"
              height="3%"
              style={{ marginLeft: "35%" }}
            />
          </div>
          <br></br>
          <label
            htmlFor="username"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            First name :{" "}
          </label>
          <input
            type="text"
            placeholder="Enter Your First  name "
            name="name"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            style={{ width: "70%", marginLeft: "15%" }}
            className="form-control"
          />
          <br></br>

          <label
            htmlFor="Phonenumber"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            Enter Your  last name :{" "}
          </label>
          <input
            type="text"
            placeholder="last name "
            name="lname"
            value={data.lname}
            onChange={(e) => {
              setData({ ...data, lname: e.target.value });
            }}
            style={{ width: "70%", marginLeft: "15%" }}
            className="form-control"
          />
          <br></br>
          <label
            htmlFor="fname"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            Email address:{" "}
          </label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            style={{ width: "70%", marginLeft: "15%" }}
            className="form-control"
          />
          <br></br>
          <label
            htmlFor="password"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            Password:{" "}
          </label>
          <input
            style={{ width: "70%", marginLeft: "15%" }}
            type="password"
            minLength="6"
            name="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="form-control"
            placeholder="Enter Password"
          />
          <br></br>
          <label
            htmlFor="role"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            User Role:{" "}
          </label>
          <select
            style={{ width: "70%", marginLeft: "15%" }}
            name="userRole"
            value={data.userRole}
            onChange={(e) => {
              setData({ ...data, userRole: e.target.value });
            }}
            className="form-control"
          >
            <option value="" disabled>Select Role</option>
            <option value="user">User</option> 
            <option value="admin">Admin</option>
          </select>
          <br></br>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              style={{ width: "1%", marginLeft: "15%" }}
              class="form-check-input"
              id="exampleCheck1"
            />
            <label
              class="form-check-label"
              for="exampleCheck1"
              style={{ width: "70%", marginLeft: "18%" }}
            >
              "I Agree" Checkboxes for Privacy Policies and Terms and Conditions
              Agreements
            </label>
          </div>
          <button
            className="btn btn-lg btn-success btn-block"
            style={{ width: "50%", marginLeft: "25%" }}
            type="submit"
          >
            Register
          </button>{" "}
          <br></br> <br></br> <br></br>
        </form>
        <p className="link" style={{ width: "50%", marginLeft: "40%" }}>
          Already have an account? <Link to="/login">Sign In</Link>
          <br></br>
        </p>
      </div>
      <br></br>
    </div>
   
  );
};

export default Register;
