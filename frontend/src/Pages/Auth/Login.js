import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logins from "../imgaes/Teacup.png";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {
        email,
        password,
      });

      if (response.data.token) {
        Swal.fire("Login success!", "Login Successful!", "success");
        // Save the token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("userId", response.data._id); // Here, ensure that response.data.userId is correct
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("useer email", response.data.email);

        setData({ email: "", password: "" });
        if (response.data.userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard"); // Redirect to the profile page
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="square border border-success border-4" >
        <br />
        <br />
        <form className="form" onSubmit={loginUser}>
          <h3 style={{ alignContent: "center", marginLeft: "45%" }}>
            {" "}
            sign in
          </h3>
          <br />
          <img
            src={Logins}
            alt=""
            width="25%"
            height="25%"
            style={{ marginLeft: "35%" }}
          />

          <label
            htmlFor="username"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            User Name:{" "}
          </label>
          <input
            style={{ width: "70%", marginLeft: "15%" }}
            type="email"
            placeholder="Email Address"
            name="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            className="form-control"
          />
          <br />
          <br />

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
            placeholder="Password"
            name="password"
            minLength="6"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="form-control"
          />
          <br />
          <br />

          <button
            className="btn btn-lg btn-success "
            type="submit"
            value="Login"
            style={{ width: "50%", marginLeft: "25%" }}
          >
            Log in{" "}
          </button>
          <br />
        </form>
        <br />
        <p className="link" style={{ width: "50%", marginLeft: "40%" }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Login;
