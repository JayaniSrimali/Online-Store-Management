const jwt = require("jsonwebtoken");

var jwtSecret = "mysecrettoken";

// Verify the token
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
        
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.id; // Corrected to use 'id' instead of 'user'

        if (decoded.role === "admin") {
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
