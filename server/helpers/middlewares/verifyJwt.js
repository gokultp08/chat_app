const JWT = require("jsonwebtoken");
const { config } = require("../../config");
const CustomError = require("../customError");

const verifyJwt = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return next(CustomError("Unauthorized", 403));
  }

  if (!token.startsWith("Bearer")) {
    return next(CustomError("Invalid Token", 403));
  }

  JWT.verify(token.split(" ")[1], config.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(CustomError("Unauthorized", 403));
    } else {
      req.currentUserId = Number(decoded.user.id);
      next();
    }
  });
};

module.exports = verifyJwt;
