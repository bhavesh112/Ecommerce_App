const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../services/sendMail");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");
const {
  forgotPassword,
  resetPassword,
} = require("../controller/password.controller");

// @route   POST api/forgot-password
// @desc    Forgot password
// @access  Public
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Please enter a valid email"),
  validateRequest,
  forgotPassword
);

// @route   PATCH api/forgot-password/
// @desc    Reset password
// @access  Public

router.patch(
  "/forgot-password",
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be at least 8 characters"),
  validateRequest,
  auth,
  resetPassword
);

module.exports = router;
