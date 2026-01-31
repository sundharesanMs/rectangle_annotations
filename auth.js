const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("req", req.body); 

  let user = await User.findOne({ username });
  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hash });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
