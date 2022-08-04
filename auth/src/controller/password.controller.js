const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMail = require("../services/sendMail");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {
  findUserById,
  updatePassword,
  findUserbyEmail,
} = require("../repository/user.repository");
const { jwtSign } = require("../services/jwtSign");

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
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = await jwtSign(payload);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserbyEmail(email);
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
          html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`,
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
    const user = await findUserById(req.user.id);
    await updatePassword(req.user.id, password);

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = await jwtSign(payload);
    res.status(200).json({ token });
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
