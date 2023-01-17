const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// @route   POST /auth
// @desc    User Authenticated
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  // =============================================================================================
  // Data Validation
  // =============================================================================================
  if (!email || email === "" || !password || password === "") {
    return res.status(400).json({
      error: "Bad Request: Some credentials are missing.",
    });
  }

  const emailRegex = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  if (!email.match(emailRegex)) {
    return res.status(400).json({
      error: "Bad Request: Invalid email.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "A User with this email does not exist." });

    if (password !== user.password) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
