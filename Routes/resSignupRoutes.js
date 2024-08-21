const express = require("express");
const AdminRouter = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../Schema/adminSchema");


require("dotenv").config();

const SECRET = process.env.SECRET;

AdminRouter.post("/", async (req, res) => {
  try {
    const { resName, resEmail, resPassword,resType  } = req.body;

    const admin = await Admin.findOne({ resEmail });

    if (admin) {
      return res.json({ error: "User already exists" });
    }

    const token = jwt.sign({ resEmail }, SECRET, { expiresIn: "1h" });

    const newAdmin = await Admin.create({ resName, resEmail, resPassword, resType });

    res.json({ newAdmin, token });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = AdminRouter;
