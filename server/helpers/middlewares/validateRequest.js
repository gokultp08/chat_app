const CustomError = require("../customError");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(CustomError("BAD REQUEST", 400));
    } else {
      next();
    }
  };
};

module.exports = validateRequest;
