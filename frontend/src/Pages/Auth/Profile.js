import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logins from "../imgaes/pro.png";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Redirect to login page or handle the error as per your requirement
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="square border border-success border-4">
        <br />
        <br />
        <form className="form">
          <h3 style={{ alignContent: "center", marginLeft: "45%" }}>
            {" "}
            My Profile
          </h3>
          <br />
          <img
            src={Logins}
            alt=""
            width="10%"
            height="10%"
            style={{ marginLeft: "45%" }}
          />

          <label
            htmlFor="username"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            Full Name{" "}
          </label>
          <input
            style={{ width: "70%", marginLeft: "15%" }}
            type="text"
            disabled
            value={user.name}
            className="form-control"
          />
          <br />
          <br />

          <label
            htmlFor="password"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            My Email{" "}
          </label>
          <input
            style={{ width: "70%", marginLeft: "15%" }}
            type="text"
            disabled
            value={user.email}
            className="form-control"
          />
          <br />
          <br />
          <label
            htmlFor="password"
            style={{ width: "70%", marginLeft: "15%" }}
            className="h6"
          >
            Profile Created At{" "}
          </label>
          <input
            style={{ width: "70%", marginLeft: "15%" }}
            type="User Type"
            disabled
            value={user.userRole}
            className="form-control"
          />
           <br />
          <br />
        
          <br />
        </form>
        <br />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Profile;
