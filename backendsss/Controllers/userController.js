const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');

var jwtSecret = "mysecrettoken";

// Register User
const registerUser = async (req, res) => {
    const { name, email, lname, password, userRole } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        user = new User({
            name,
            email,
            lname,
            password,
            userRole
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, userRole: user.userRole });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Authentication the user
// Authentication the user
const authUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
            if (err) throw err;
            res.json({ token, userId: user.id, name: user.name, userRole: user.userRole });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(!!req.query.role ? { userRole: req.query.role } : {});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get one User
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, lname, password, userRole } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { name, email, lname, password, userRole, _id: id };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
}

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
}



const logoutUser = async (req, res) => {
    // Clear the authentication token from client-side storage
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
}



const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers,getUserProfile, getUser,logoutUser, deleteUser, updateUser, registerUser, authUser, loginUser };
