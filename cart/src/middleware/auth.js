const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        error: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Token is not valid",
    });
  }
};
