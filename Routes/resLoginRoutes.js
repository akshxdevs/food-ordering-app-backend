const express = require("express");
const AdminRouter = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../Schema/adminSchema");
require("dotenv").config();

const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
}

AdminRouter.post("/", async (req, res) => {
    try {
        const { resEmail, resPassword } = req.body;

        if (!resEmail || !resPassword) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const admin = await Admin.findOne({ resEmail });

        if (!admin) {
            return res.status(401).json({ error: "User not found" });
        }

        if (resPassword !== admin.resPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            {
                resEmail: admin.resEmail,
                _id: admin._id,
            },
            SECRET,
            { expiresIn: '1h' } 
        );

        res.json({
            token,
            admin: {
                _id: admin._id,
                name: admin.resName,
                email: admin.resEmail
            },
        });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = AdminRouter;
