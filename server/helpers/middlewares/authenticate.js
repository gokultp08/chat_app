const JWT = require("jsonwebtoken");
const { config } = require("../../config");

const authenticate = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    throw new Error("Unauthorized");
    // return res.status(403).json("Unauthorized");
  }

  if (!token.startsWith("Bearer")) {
    throw new Error("Invalid Token");
    // return res.status(403).json("Invalid Token");
  }

  JWT.verify(token.split(" ")[1], config.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error("Unauthorized");
      //   return res.status(403).json("Unauthorized");
    } else {
      console.log(decoded);
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = authenticate;
