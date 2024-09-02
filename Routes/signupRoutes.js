const express = require("express");
const UserRouter = express.Router();
const User = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET;

UserRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "User already exists" });
    }

    const token = jwt.sign({ email }, SECRET);

    const newUser = await User.create({ username, email, password });

    res.json({ username:newUser.username ,id:newUser._id, token,});
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = UserRouter;
