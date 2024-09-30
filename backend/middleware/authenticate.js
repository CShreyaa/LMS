const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = "ad0f35420804c41ec2ab4c7464dd79e80ce7c9f1192814b6d48267e43ed1bb62";

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Authentication token missing");
        }
        const decoded = jwt.verify(token, keysecret);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if (!user) {
            throw new Error("User not authenticated");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Please login again" });
    }
};

module.exports = authenticate;
