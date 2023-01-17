const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/authToken");

const JWT_SECRET = process.env.JWT_SECRET;

// @route   GET /user
// @desc    Get User
// @access  Private
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /user
// @desc    Add User
// @access  Public
router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  name = name?.trim();
  email = email?.trim();
  password = password?.trim();

  // =============================================================================================
  // Data Validation
  // =============================================================================================
  if (
    !name ||
    name === "" ||
    !email ||
    email === "" ||
    !password ||
    password === ""
  ) {
    return res.status(400).json({
      error: "Bad Request: Some credentials are missing.",
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      error: "Bad Request: Please enter atleast 3 characters for name.",
    });
  }

  if (password.length < 3 || password.length > 20) {
    return res.status(400).json({
      error: "Bad Request: Please enter 3 - 20 characters for password.",
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
    // =============================================================================================
    // User should be unique
    // =============================================================================================
    const user = await User.findOne({ email }).select("-password");
    console.log("USER >> ", user);
    if (user)
      return res
        .status(400)
        .json({ error: "User with this email already exist." });

    // =============================================================================================
    // Add User in database
    // =============================================================================================
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    // =============================================================================================
    // Generate Token
    // =============================================================================================
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) throw error;

        // success
        return res.status(200).json({
          message: "User has been added",
          token,
        });
      }
    );
  } catch (error) {
    // error
    console.log("ERROR >> ", error);
    res.status(500).json({ message: "Server Error." });
  }
});

module.exports = router;
