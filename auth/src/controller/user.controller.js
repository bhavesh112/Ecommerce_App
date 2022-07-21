const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  findUserbyEmail,
  addUser,
  findUserById,
  findUserByIdwithoutPassword,
} = require("../repository/user.repository");
const { jwtSign } = require("../services/jwtSign");

// This is the function that will be called when the user clicks the "Sign Up" button.
const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await findUserbyEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const user = await addUser({
      email,
      password,
      name,
      role,
    });
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = await jwtSign(payload);
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.msg,
    });
  }
};

// This is the function that will be called when the user clicks the "Sign In" button.
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserbyEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = await jwtSign(payload);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// Get the user's profile.

const getUser = async (req, res) => {
  try {
    const user = await findUserByIdwithoutPassword(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
};
