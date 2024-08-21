const express = require("express");
const UserRouter = express.Router();
const User = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");
const Admin = require("../Schema/adminSchema");
require("dotenv").config();

const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
}

UserRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            {
                email: user.email,
                _id: user._id,
            },
            SECRET,
            { expiresIn: '1h' } 
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.username,
                email: user.email,
                address:user.address,
                phoneNo:user.phoneNo,
            },
        });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = UserRouter;
