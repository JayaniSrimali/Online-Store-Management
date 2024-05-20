const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const { check } = require("express-validator");
const { getUsers, getUserProfile , getUser, logoutUser ,deleteUser, updateUser, registerUser, authUser, loginUser  } = require("../Controllers/userController");


router.get("/getAllUsers", auth, getUsers); 
router.get("/getUserById/:id", auth, getUser);
router.delete("/deleteUser/:id", auth, deleteUser); 
router.patch("/updateUserById/:id", auth, updateUser);
router.post("/logout", auth, logoutUser);
router.get("/getUserProfile/:id", auth, getUserProfile); // New route for user profile

router.post("/signup",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),

    ],
    registerUser);

router.get("/auth", auth, authUser);

// // Validate only admin users can access the auth route
// router.get("/auth", auth, (req, res, next) => {
//     if (req.isAdmin) {
//         authUser(req, res, next); // Call authUser controller if user is an admin
//     } else {
//         res.status(403).json({ msg: "Unauthorized access. Admin privileges required" });
//     }
// });

router.post(
    "/signin",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    loginUser);


module.exports = router;
