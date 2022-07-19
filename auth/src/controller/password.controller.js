const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMail = require("../services/sendMail");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {
  findUserById,
  updatePassword,
} = require("../repository/user.repository");

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    await updatePassword(req.user.id, newPassword);
    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 600 },
      async (err, token) => {
        if (err) throw err;
        const info = await sendMail({
          to: email,
          subject: "Reset Password",
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: http://localhost:3000/reset-password/${token}`,
        });
        res.json({ link: nodemailer.getTestMessageUrl(info) });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    await updatePassword(req.user.id, password);

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  changePassword,
  forgotPassword,
  resetPassword,
};
