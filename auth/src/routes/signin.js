const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");
const { loginUser, getUser } = require("../controller/user.controller");

// @route   GET api/signin
// @desc    Get logged in user
// @access  Private

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/signin", auth, getUser);

// @route   POST api/signin
// @desc    Signin user
// @access  Public

router.post(
  "/signin",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validateRequest,
  loginUser
);

module.exports = router;
