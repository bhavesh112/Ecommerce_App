const jwtSign = (payload) =>
  new Promise((resolve, reject) => {
    const jwt = require("jsonwebtoken");
    const secret = process.env.JWT_SECRET;
    jwt.sign(payload, secret, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
module.exports = { jwtSign };
