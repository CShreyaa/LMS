const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "ad0f35420804c41ec2ab4c7464dd79e80ce7c9f1192814b6d48267e43ed1bb62";

// user login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id }, keysecret, {
            expiresIn: "1d" // Token expires in 1 day (adjust as needed)
        });

        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000), // Cookie expiration time
            httpOnly: true // HTTP only flag
        });

        res.status(200).json({ status: 200, result: { user, token } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
