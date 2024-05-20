import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register"; // Import the Register component
import Profile from "./Pages/Auth/Profile";
import Landingscreen from "./Pages/common/Landingscreen";
import NavBar from "./Pages/common/Navbar";
import Footer from "./Pages/common/Footer";
import Homes from "./Pages/common/Layouts/Main";
import AddProduct from "./Pages/Admin/AddProduct";
import AllProduct from "./Pages/Admin/AllProduct";
import Cart from "./Pages/Admin/Cart";
import AdminAllProdcut from "./Pages/Admin/AdminAllProdcut";
import Checkout  from "./Pages/Admin/Checkout";



const App = () => {

  return (
    <Router>
          <NavBar />
        <Routes>
        <Route exact path="/" element={<Landingscreen />} />   
         <Route path="/login" element={<Login />} /> 
         <Route  path="/dashboard" element={<Homes/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/AdminAllProdcut" element={<AdminAllProdcut />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
         


          
        </Routes>
        <Footer/>
    </Router>
  );
};

export default App;
