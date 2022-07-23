const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    if (decoded.user.role !== "admin") {
      return res
        .status(401)
        .json({ msg: "You are not authorized to perform this action" });
    }
    req.user = { ...decoded.user };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = adminAuth;
