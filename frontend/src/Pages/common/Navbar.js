import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Login from '../imgaes/log.png';
import Swal from "sweetalert2";


const NavBar = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    const handleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        Swal.fire("Succesfully", "LogOut", "success");
        navigate("/");
    }
    
    return (
        <div>
            <div>
                <nav className="navbar  navbar-expand-lg">
                    <a className="navbar-brand" href="/">
                        <img src={Login} alt="" width="80" height="80" />
                    </a>
                    <a className="navbar-brand" href="/">
                    Alhena Tea product
                    </a>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <a style={{ display: userRole === "admin" ? "flex" : "none", textDecoration: "none" }} className="nav-link" href="/AdminAllProdcut" aria-current="page">Admin Dashboard  </a>
                                </li>
                                <li className="nav-item">
                                    <a style={{ display: userRole === "user" ? "flex" : "none", textDecoration: "none" }} className="nav-link" href="/AllProduct" aria-current="page">Dashboard  </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a style={{ display: userRole === "user" ? "flex" : "none", textDecoration: "none" }} className="nav-link" href="" aria-current="page"> Cart </a>
                                </li> */}
                                <li className="nav-item">
                                    <a style={{ display: userRole === "user" ? "flex" : "none", textDecoration: "none" }} className="nav-link" href="/AllProduct" aria-current="page"> Products </a>
                                </li>
                               
                                <li className="nav-item">
                                    <a style={{ display: userRole === "admin" ? "flex" : "none", textDecoration: "none" }} className="nav-link" href="/AddProduct" aria-current="page"> Add Products </a>
                                </li>
                            </div>
                        </div>
                        <Link to="/Profile">
                            <button className="btn btn-secondary toggle" aria-haspopup="true" aria-expanded="false" type="submit" style={{ float: "right", marginRight: "10px", display: userRole ? "flex" : "none" }}>
                                {"Profile"}
                            </button>
                        </Link>
                        <Link to="/cart">
                            <button className="btn btn-secondary toggle" aria-haspopup="true" aria-expanded="false" type="submit" style={{ float: "right", marginRight: "10px",  display: userRole === "user" ? "flex" : "none" }}>
                                {"View Cart"}
                            </button>
                        </Link>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-secondary toggle" aria-haspopup="true" aria-expanded="false" type="submit" style={{ float: "right", marginRight: "10px", display: userRole ? "flex" : "none" }}>
                        {"Logout"}
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
