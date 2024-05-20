import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import Logins from "../imgaes/Home.png";
import '../../App.css';
AOS.init({
  duration: '2000'
});

function Landingscreen() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <div className="landing-container" style={{ background:'#093203', height: '100vh' }}>
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{ borderRight: '8px' }}>
          <h2 style={{ color: "white", fontSize: "120px" }} data-aos='zoom-in'>Alhena </h2>
          <h3 style={{ color: "white", fontSize: "60px" }} data-aos='zoom-in'>Tea Product </h3>
          <br></br><br></br>
          <img   src={Logins} style={{ maxWidth: '320px', animation: 'zoomInOut 10s infinite alternate' }} data-aos='zoom-in-out' />
          <br></br><br></br><br></br><br></br><br></br>
          <h1 style={{ color: "white" }}>"There is only one biggest Tea product Company"</h1>
          <br></br><br></br>
          <Link to="/login">
            <button className="btn btn-light text-black" >Get Started</button>
          </Link>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Landingscreen;

