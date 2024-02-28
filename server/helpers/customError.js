module.exports = (message = "Internal Server Error", statusCode = 500) => {
  const myError = new Error(message);
  myError.statusCode = statusCode;
  return myError;
};
