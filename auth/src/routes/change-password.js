const express = require("express");
const { body } = require("express-validator");
const { changePassword } = require("../controller/password.controller");
const auth = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.patch(
  "/change-password",
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
  validateRequest,
  auth,
  changePassword
);

module.exports = router;
